terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.54.0"
    }
  }
}

provider "google" {
  project = "invoices-379817"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}
