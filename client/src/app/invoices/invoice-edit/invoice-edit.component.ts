import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

import { InvoicesService } from '@app/_services/invoices.service';
import { IInvoice } from '@app/_models';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss'],
})
export class InvoiceEditComponent implements OnInit {
  terms = [1, 7, 14, 30];
  @Input() invoice!: IInvoice;
  editForm: FormGroup = this.fb.group({
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

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.editForm.patchValue({
      sender_address: this.fb.group({
        street: this.invoice.sender_address.street,
        city: this.invoice.sender_address.city,
        post_code: this.invoice.sender_address.post_code,
        country: this.invoice.sender_address.country,
      }),
      payment_terms: this.invoice.payment_terms,
      client_name: this.invoice.client_name,
      client_email: this.invoice.client_email,
      client_address: this.fb.group({
        street: this.invoice.client_address.street,
        city: this.invoice.client_address.city,
        post_code: this.invoice.client_address.post_code,
        country: this.invoice.client_address.country,
      }),
      description: this.invoice.description,
      status: this.invoice.status,
      total: this.invoice.total,
    });

    const groups = [];
    for (let item of this.invoice.items) {
      groups.push(
        this.fb.group({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })
      );
    }
    this.editForm.setControl('items', this.fb.array(groups));
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: new FormControl(''),
      quantity: new FormControl(0),
      price: new FormControl(0),
      total: new FormControl(0),
    });
  }

  get items(): FormArray {
    return <FormArray>this.editForm.get('items');
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  getPaymentTerms() {
    return this.editForm.get('payment_terms')?.value;
  }

  setPaymentTerms(term: number) {
    this.editForm.patchValue({
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

    this.editForm.patchValue({
      total: total,
    });
  }

  setValidators() {
    this.editForm
      .get('sender_address')
      ?.get('street')
      ?.setValidators([Validators.required]);
    this.editForm
      .get('sender_address')
      ?.get('street')
      ?.updateValueAndValidity();
    this.editForm
      .get('sender_address')
      ?.get('city')
      ?.setValidators([Validators.required]);
    this.editForm.get('sender_address')?.get('city')?.updateValueAndValidity();
    this.editForm
      .get('sender_address')
      ?.get('post_code')
      ?.setValidators([Validators.required]);
    this.editForm
      .get('sender_address')
      ?.get('post_code')
      ?.updateValueAndValidity();
    this.editForm
      .get('sender_address')
      ?.get('country')
      ?.setValidators([Validators.required]);
    this.editForm
      .get('sender_address')
      ?.get('country')
      ?.updateValueAndValidity();

    this.editForm
      .get('client_address')
      ?.get('street')
      ?.setValidators([Validators.required]);
    this.editForm
      .get('client_address')
      ?.get('street')
      ?.updateValueAndValidity();
    this.editForm
      .get('client_address')
      ?.get('city')
      ?.setValidators([Validators.required]);
    this.editForm.get('client_address')?.get('city')?.updateValueAndValidity();
    this.editForm
      .get('client_address')
      ?.get('post_code')
      ?.setValidators([Validators.required]);
    this.editForm
      .get('client_address')
      ?.get('post_code')
      ?.updateValueAndValidity();
    this.editForm
      .get('client_address')
      ?.get('country')
      ?.setValidators([Validators.required]);
    this.editForm
      .get('client_address')
      ?.get('country')
      ?.updateValueAndValidity();

    this.editForm.get('client_name')?.setValidators([Validators.required]);
    this.editForm.get('client_name')?.updateValueAndValidity();
    this.editForm
      .get('client_email')
      ?.setValidators([Validators.required, Validators.email]);
    this.editForm.get('client_email')?.updateValueAndValidity();
    this.editForm.get('status')?.setValidators([Validators.required]);
    this.editForm.get('status')?.updateValueAndValidity();

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
    this.editForm.patchValue({
      status: 'pending',
    });
    this.setTotal();

    this.setValidators();
    // this.editForm.updateValueAndValidity();

    if (this.editForm.valid) {
      this.invoiceService
        .updateInvoice(this.invoice.id!, this.editForm.value)
        .subscribe({
          next: (invoice) => {
            console.log(invoice);
            window.location.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
