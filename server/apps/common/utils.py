from io import BytesIO
import logging
import sys
import os

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile

from google.cloud import storage
from PIL import Image

logger = logging.getLogger(__name__)
logger.info(f"Current working directory -> {os.getcwd()}")
client = storage.Client.from_service_account_json(
    json_credentials_path="./credentials.json"
)
bucket = client.get_bucket(settings.STORAGE_BUCKET)


def upload_image(
    image,
    profile_id,
    size=(300, 300),
    size_str="large",
):
    logger.info(f"Uploading image -> size: {size_str}")
    image_temp = Image.open(image)
    output_stream = BytesIO()
    image_resized = image_temp.resize(size)
    image_resized.save(output_stream, format=image_temp.format, quality=80)
    output_stream.seek(0)
    uploaded_image = InMemoryUploadedFile(
        output_stream,
        "ImageField",
        f"{image.name}",
        f"image/{image.name.split('.')[1]}",
        sys.getsizeof(output_stream),
        None,
    )
    blob = bucket.blob(f"{size_str}/{profile_id}.{image.name.split('.')[1]}")
    blob.content_type = f'image/{image.name.split(".")[1]}'
    blob.upload_from_file(uploaded_image)
    return blob.public_url
