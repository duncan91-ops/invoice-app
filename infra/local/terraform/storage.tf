resource "google_storage_bucket" "invoices" {
  name                        = var.bucket
  location                    = "EU"
  force_destroy               = true
  uniform_bucket_level_access = true
}

resource "google_service_account" "storage" {
  account_id   = var.service_account_id
  display_name = "Invoices Storage SA"
}

data "google_iam_policy" "storage" {
  binding {
    role = "roles/storage.admin"
    members = [
      "serviceAccount:${google_service_account.storage.email}"
    ]
  }

  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers"
    ]
  }
}

resource "google_storage_bucket_iam_policy" "invoices" {
  bucket      = google_storage_bucket.invoices.name
  policy_data = data.google_iam_policy.storage.policy_data
}
