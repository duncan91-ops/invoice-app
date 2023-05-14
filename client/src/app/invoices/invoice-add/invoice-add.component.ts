import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

import { InvoicesService } from '@app/_services/invoices.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss'],
})
export class InvoiceAddComponent {
  terms = [1, 7, 14, 30];
  addForm: FormGroup = this.fb.group({
    sender_address: this.fb.group({
      street: '',
      city: '',
      post_code: '',
      country: ['Kenya', Validators.required],
    }),
    payment_terms: this.terms[0],
    client_name: '',
    client_email: '',
    client_address: this.fb.group({
      street: '',
      city: '',
      post_code: '',
      country: ['Kenya', Validators.required],
    }),
    description: '',
    status: '',
    items: this.fb.array([this.createItem()]),
    total: 0,
  });
  showPaymentTerms = false;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoicesService
  ) {}

  createItem(): FormGroup {
    return this.fb.group({
      name: new FormControl(''),
      quantity: new FormControl(0),
      price: new FormControl(0),
      total: new FormControl(0),
    });
  }

  get items(): FormArray {
    return <FormArray>this.addForm.get('items');
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  getPaymentTerms() {
    return this.addForm.get('payment_terms')?.value;
  }

  setPaymentTerms(term: number) {
    this.addForm.patchValue({
      payment_terms: term,
    });
    this.showPaymentTerms = false;
  }

  calculateItemTotal(quantity: string, price: string, i: number): number {
    const value = Number(quantity) * Number(price);
    const total = parseFloat(value.toFixed(2));
    this.items.get(`${i}`)?.patchValue({
      total: +total,
    });
    return +total;
  }

  setTotal() {
    let total = 0;
    for (let item of this.items.controls) {
      const item_total = item.get('total')?.value;
      total += item_total;
    }

    this.addForm.patchValue({
      total: total,
    });
  }

  setValidators() {
    this.addForm
      .get('sender_address')
      ?.get('street')
      ?.setValidators([Validators.required]);
    this.addForm.get('sender_address')?.get('street')?.updateValueAndValidity();
    this.addForm
      .get('sender_address')
      ?.get('city')
      ?.setValidators([Validators.required]);
    this.addForm.get('sender_address')?.get('city')?.updateValueAndValidity();
    this.addForm
      .get('sender_address')
      ?.get('post_code')
      ?.setValidators([Validators.required]);
    this.addForm
      .get('sender_address')
      ?.get('post_code')
      ?.updateValueAndValidity();
    this.addForm
      .get('sender_address')
      ?.get('country')
      ?.setValidators([Validators.required]);
    this.addForm
      .get('sender_address')
      ?.get('country')
      ?.updateValueAndValidity();

    this.addForm
      .get('client_address')
      ?.get('street')
      ?.setValidators([Validators.required]);
    this.addForm.get('client_address')?.get('street')?.updateValueAndValidity();
    this.addForm
      .get('client_address')
      ?.get('city')
      ?.setValidators([Validators.required]);
    this.addForm.get('client_address')?.get('city')?.updateValueAndValidity();
    this.addForm
      .get('client_address')
      ?.get('post_code')
      ?.setValidators([Validators.required]);
    this.addForm
      .get('client_address')
      ?.get('post_code')
      ?.updateValueAndValidity();
    this.addForm
      .get('client_address')
      ?.get('country')
      ?.setValidators([Validators.required]);
    this.addForm
      .get('client_address')
      ?.get('country')
      ?.updateValueAndValidity();

    this.addForm.get('client_name')?.setValidators([Validators.required]);
    this.addForm.get('client_name')?.updateValueAndValidity();
    this.addForm
      .get('client_email')
      ?.setValidators([Validators.required, Validators.email]);
    this.addForm.get('client_email')?.updateValueAndValidity();
    this.addForm.get('status')?.setValidators([Validators.required]);
    this.addForm.get('status')?.updateValueAndValidity();

    this.setItemValidators();
  }

  setItemValidators() {
    for (let item of this.items.controls) {
      item.get('name')?.setValidators([Validators.required]);
      item.get('name')?.updateValueAndValidity();
      item.get('quantity')?.setValidators([Validators.required]);
      item.get('quantity')?.updateValueAndValidity();
      item.get('price')?.setValidators([Validators.required]);
      item.get('price')?.updateValueAndValidity();
    }
  }

  save() {
    this.invoiceService.createInvoice(this.addForm.value).subscribe({
      next: (invoice) => {
        console.log(invoice);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveAsDraft() {
    this.addForm.patchValue({
      status: 'draft',
    });

    this.setTotal();

    this.save();
  }

  saveAndSend() {
    this.addForm.patchValue({
      status: 'pending',
    });
    this.setTotal();

    this.setValidators();
    // this.addForm.updateValueAndValidity();

    if (this.addForm.valid) {
      this.save();
    }
  }
}
