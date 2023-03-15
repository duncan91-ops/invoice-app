import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from django_countries.fields import CountryField


class TimeStampedUUIDModel(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Address(models.Model):
    country = CountryField(
        verbose_name=_("Country"), default="KE", blank=False, null=False
    )
    city = models.CharField(
        verbose_name=_("City"),
        max_length=180,
        default="Nairobi",
        blank=False,
        null=False,
    )
    street = models.CharField(verbose_name=_("Street"), max_length=255)
    post_code = models.CharField(verbose_name=_("Post Code"), max_length=150)

    class Meta:
        abstract = True
