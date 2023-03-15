from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from apps.common.models import TimeStampedUUIDModel

CustomUser = get_user_model()


class Profile(TimeStampedUUIDModel):
    class Gender(models.TextChoices):
        MALE = "Male", _("Male")
        FEMALE = "Female", _("Female")
        OTHER = "Other", _("Other")

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="profile"
    )
    about_me = models.TextField(
        verbose_name=_("About Me"), help_text="Say something about yourself"
    )
    gender = models.CharField(
        verbose_name=_("Gender"),
        max_length=20,
        choices=Gender.choices,
        default=Gender.OTHER,
    )
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"), default="+2547XXXXXXXX", max_length=30
    )
    country = CountryField(verbose_name=_("Country"), default="KE")
    city = models.CharField(verbose_name=_("City"), max_length=180, default="Nairobi")
    street = models.CharField(verbose_name=_("Street"), max_length=255)
    post_code = models.CharField(verbose_name=_("Post Code"), max_length=150)

    def __str__(self):
        return f"{self.user.email}' profile"


class ProfilePhoto(models.Model):
    profile = models.OneToOneField(
        Profile, on_delete=models.CASCADE, related_name="profile_photo"
    )
    small = models.URLField(verbose_name=_("Small sized Profile Photo"), max_length=500)
    medium = models.URLField(
        verbose_name=_("medium sized Profile Photo"), max_length=500
    )
    large = models.URLField(verbose_name=_("large sized Profile Photo"), max_length=500)

    def __str__(self):
        return f"{self.profile.user.email}'s profile photo"
