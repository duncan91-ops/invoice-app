from django.contrib import admin

from .models import Client


class ClientAdmin(admin.ModelAdmin):
    list_display = [
        "pkid",
        "id",
        "user",
        "first_name",
        "last_name",
        "email",
        "country",
        "city",
        "street",
        "post_code",
    ]
    list_display_links = ["id", "user", "email"]
    list_filter = ["user", "first_name", "last_name", "country", "city"]


admin.site.register(Client, ClientAdmin)
