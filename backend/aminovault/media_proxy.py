import mimetypes

from django.core.files.storage import default_storage
from django.http import FileResponse, Http404


def media_proxy(request, path):
    """Stream a media file from S3/MinIO through this (HTTPS) domain.

    Avoids exposing the storage backend's own URL directly to browsers —
    useful when the storage endpoint isn't (or can't easily be) served
    over HTTPS itself, which would otherwise get blocked as mixed content
    on an HTTPS storefront.
    """
    if not default_storage.exists(path):
        raise Http404()

    content_type = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return FileResponse(default_storage.open(path, 'rb'), content_type=content_type)
