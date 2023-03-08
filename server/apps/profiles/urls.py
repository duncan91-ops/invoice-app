from django.urls import path

from .views import GetProfileAPIView, UpdateProfileAPIView, upload_profile_photo


urlpatterns = [
    path("me/", GetProfileAPIView.as_view(), name="get_profile"),
    path("update/<str:email>/", UpdateProfileAPIView.as_view(), name="update_profile"),
    path(
        "upload/<uuid:profile_id>/", upload_profile_photo, name="upload_profile_photo"
    ),
]
