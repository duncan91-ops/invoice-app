from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Profile, ProfilePhoto


class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePhoto
        fields = ["small", "medium", "large"]


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    full_name = serializers.SerializerMethodField(read_only=True)
    total_invoice_count = serializers.IntegerField(source="user.total_invoice_count")
    draft_invoice_count = serializers.IntegerField(source="user.draft_invoice_count")
    pending_invoice_count = serializers.IntegerField(source="user.pending_invoice_count")
    paid_invoice_count = serializers.IntegerField(source="user.paid_invoice_count")
    profile_photo = ProfilePhotoSerializer()
    country = CountryField(name_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "profile_photo",
            "gender",
            "about_me",
            "phone_number",
            "country",
            "city",
            "street",
            "post_code",
            "total_invoice_count",
            "draft_invoice_count",
            "pending_invoice_count",
            "paid_invoice_count",
        ]

    def get_full_name(self, obj):
        first_name = obj.user.first_name.title()
        last_name = obj.user.last_name.title()
        return f"{first_name} {last_name}"


class UpdateProfileSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "gender",
            "about_me",
            "phone_number",
            "country",
            "city",
            "street",
            "post_code",
        ]
