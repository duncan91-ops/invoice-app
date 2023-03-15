from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from django_countries.fields import CountryField

from apps.common.models import TimeStampedUUIDModel

CustomUser = get_user_model()


class Client(TimeStampedUUIDModel):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="clients"
    )
    first_name = models.CharField(verbose_name=_("Client First Name"), max_length=50)
    last_name = models.CharField(
        verbose_name=_("Client Last Name"), max_length=50, blank=True
    )
    email = models.EmailField(verbose_name=_("Client Email Address"))
    country = CountryField(verbose_name=_("Client Country"))
    city = models.CharField(verbose_name=_("Client City"), max_length=180)
    street = models.CharField(verbose_name=_("Client Street"), max_length=255)
    post_code = models.CharField(verbose_name=_("Client Post Code"), max_length=150)

    class Meta:
        unique_together = ["user", "email"]

    def __str__(self):
        return f"{self.first_name.title()} {self.last_name.title()}"
