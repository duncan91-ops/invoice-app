from rest_framework.exceptions import APIException


class ProfileNotFound(APIException):
    status_code = 404
    default_detail = "The profile requested cannot be found"


class NotYourProfile(APIException):
    status_code = 403
    default_detail = "You cannot edit a profile that does not belong to you"
