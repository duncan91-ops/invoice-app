import logging

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile, ProfilePhoto

logger = logging.getLogger(__name__)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    logger.info(f"{instance}'s profile created")


@receiver(post_save, sender=Profile)
def create_user_profile_photo(sender, instance, created, **kwargs):
    if created:
        ProfilePhoto.objects.create(profile=instance)


@receiver(post_save, sender=Profile)
def save_user_profile_photo(sender, instance, **kwargs):
    instance.profile_photo.save()
    logger.info(f"{instance}'s profile photo created")
