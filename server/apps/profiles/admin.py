from django.contrib import admin

from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        "pkid",
        "id",
        "user",
        "gender",
        "phone_number",
        "country",
        "city",
        "street",
        "post_code",
    ]
    list_display_links = ["id", "user"]
    list_filter = ["gender", "country", "city"]


admin.site.register(Profile, ProfileAdmin)
