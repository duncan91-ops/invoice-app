from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Client
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "country",
            "city",
            "street",
            "post_code",
        ]

    def get_full_name(self, obj):
        first_name = obj.first_name.title()
        last_name = obj.last_name.title()
        return f"{first_name} {last_name}"
