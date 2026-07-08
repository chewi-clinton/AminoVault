import mimetypes
import os

from django.core.files.storage import default_storage
from django.http import FileResponse, Http404

# Explicit fallback for extensions minimal container images may not have
# registered in /etc/mime.types (mimetypes falls back to the system file,
# which python:3.11-slim doesn't ship).
EXTRA_TYPES = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
}


def media_proxy(request, path):
    """Stream a media file from S3/MinIO through this (HTTPS) domain.

    Avoids exposing the storage backend's own URL directly to browsers —
    useful when the storage endpoint isn't (or can't easily be) served
    over HTTPS itself, which would otherwise get blocked as mixed content
    on an HTTPS storefront.
    """
    if not default_storage.exists(path):
        raise Http404()

    ext = os.path.splitext(path)[1].lower()
    content_type = EXTRA_TYPES.get(ext) or mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return FileResponse(default_storage.open(path, 'rb'), content_type=content_type)
