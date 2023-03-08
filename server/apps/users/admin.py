from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm

CustomUser = get_user_model()


class CustomUserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = [
        "pkid",
        "id",
        "email",
        "first_name",
        "last_name",
        "is_staff",
    ]
    list_display_links = ["id", "email"]
    list_filter = ["email", "first_name", "last_name", "is_staff"]
    fieldsets = (
        (
            _("Login Crendetials"),
            {
                "fields": (
                    "email",
                    "password",
                ),
            },
        ),
        (
            _("Personal Information"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                ),
            },
        ),
        (
            _("Permissions and Groups"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (
            _("Important Dates"),
            {
                "fields": (
                    "date_joined",
                    "last_login",
                ),
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = ["email", "first_name", "last_name"]


admin.site.register(CustomUser, CustomUserAdmin)
