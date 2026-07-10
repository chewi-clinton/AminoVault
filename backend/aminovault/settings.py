from pathlib import Path
import os
import dj_database_url
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / '.env')

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-dev-key-change-in-prod')
DEBUG = os.environ.get('DEBUG', 'True') == 'True'
default_hosts = ['localhost', '127.0.0.1', '0.0.0.0', 'amino-vault.com', 'www.amino-vault.com', 'backend.amino-vault.com']
env_hosts = os.environ.get('ALLOWED_HOSTS', '')
if env_hosts:
    default_hosts.extend([host.strip() for host in env_hosts.split(',') if host.strip()])
ALLOWED_HOSTS = list(dict.fromkeys(default_hosts))

# Dokploy's proxy terminates HTTPS and forwards to this container over plain
# HTTP — without this, Django thinks every request is insecure (wrong scheme
# in build_absolute_uri(), broken redirects, etc).
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    'storages',
    'products',
    'orders',
    'users',
    'contact',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'aminovault.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'aminovault.wsgi.application'

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
        ssl_require=os.environ.get('DB_SSL_REQUIRE', 'False') == 'True',
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'users.User'

# ─── S3-compatible media storage (MinIO, R2, or AWS S3) ──────────────────────
S3_ACCESS_KEY_ID = os.environ.get('S3_ACCESS_KEY_ID', '')
S3_SECRET_ACCESS_KEY = os.environ.get('S3_SECRET_ACCESS_KEY', '')
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'aminovault')
S3_ENDPOINT_URL = os.environ.get('S3_ENDPOINT_URL', '')
S3_CUSTOM_DOMAIN = os.environ.get('S3_CUSTOM_DOMAIN', '')

if S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY and S3_ENDPOINT_URL:
    DEFAULT_FILE_STORAGE = 'aminovault.storage_backends.MediaStorage'
    AWS_ACCESS_KEY_ID = S3_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY = S3_SECRET_ACCESS_KEY
    AWS_STORAGE_BUCKET_NAME = S3_BUCKET_NAME
    AWS_S3_ENDPOINT_URL = S3_ENDPOINT_URL
    AWS_S3_REGION_NAME = 'auto'
    AWS_S3_ADDRESSING_STYLE = 'path'
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_FILE_OVERWRITE = False
    AWS_QUERYSTRING_AUTH = False
    if S3_CUSTOM_DOMAIN:
        AWS_S3_CUSTOM_DOMAIN = S3_CUSTOM_DOMAIN
        MEDIA_URL = f'https://{S3_CUSTOM_DOMAIN}/media/'
    else:
        MEDIA_URL = f'{S3_ENDPOINT_URL}/{S3_BUCKET_NAME}/media/'
else:
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'media'

# ─── Django REST Framework ────────────────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 24,
}

# ─── JWT Settings ─────────────────────────────────────────────────────────────
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ─── CORS ─────────────────────────────────────────────────────────────────────
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
CORS_ALLOWED_ORIGINS = [
    FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://amino-vault.com',
    'https://www.amino-vault.com',
]
CORS_ALLOW_CREDENTIALS = True

# ─── Brevo (Sendinblue) Email ─────────────────────────────────────────────────
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('BREVO_SMTP_HOST', 'smtp-relay.brevo.com')
EMAIL_PORT = int(os.environ.get('BREVO_SMTP_PORT', 587))
EMAIL_HOST_USER = os.environ.get('BREVO_SMTP_LOGIN', '')
EMAIL_HOST_PASSWORD = os.environ.get('BREVO_SMTP_KEY', '')
EMAIL_USE_TLS = True
EMAIL_TIMEOUT = 10  # seconds — fail fast instead of hanging the checkout request if Brevo is unreachable

STORE_OWNER_EMAIL = os.environ.get('STORE_OWNER_EMAIL', 'info@amino-vault.com')
STORE_FROM_EMAIL = os.environ.get('STORE_FROM_EMAIL', 'info@amino-vault.com')
STORE_NAME = os.environ.get('STORE_NAME', 'AminoVault')
DEFAULT_FROM_EMAIL = f'{STORE_NAME} <{STORE_FROM_EMAIL}>'
