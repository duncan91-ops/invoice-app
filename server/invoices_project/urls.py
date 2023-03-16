from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    path("api/v1/profiles/", include("apps.profiles.urls")),
    path("api/v1/invoices/", include("apps.invoices.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Invoices Admin"
admin.site.site_title = "Invoices Admin Portal"
admin.site.index_title = "Welcome to the Invoices Portal"
