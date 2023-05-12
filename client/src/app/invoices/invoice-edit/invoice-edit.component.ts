import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
  editForm!: FormGroup;
  terms = [1, 7, 14, 30];
  showPaymentTerms = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      sender_address: this.fb.group({
        street: '',
        city: '',
        post_code: '',
        country: '',
      }),
      payment_terms: this.terms[0],
      client_name: '',
      client_email: '',
      client_address: this.fb.group({
        street: '',
        city: '',
        post_code: '',
        country: '',
      }),
      status: '',
      items: this.fb.array([this.createItem(), this.createItem()])
    })
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: new FormControl(''),
      quantity: new FormControl(0),
      price: new FormControl(0),
      total: new FormControl(0)
    })
  }

  get items(): FormArray {
    return <FormArray>this.editForm.get('items')
  }

  addItem(): void {
    this.items.push(this.createItem())
  }

  calculateItemTotal(quantity: string, price: string, i: number): number {
    const value = Number(quantity) * Number(price)
    const total = parseFloat(value.toFixed(2))
    this.items.get(`${i}`)?.patchValue({
      total: total
    })
    return total
  }

  saveAsDraft() {
    this.editForm.patchValue({
      status: 'Draft',
    })
    console.log(this.editForm.value)
  }

  saveAndSend() {
    this.editForm.patchValue({
      status: 'Pending',
    })
    console.log(this.editForm.value)
  }

  getPaymentTerms() {
    return this.editForm.get('payment_terms')?.value
  }

  setPaymentTerms(term: number) {
    this.editForm.patchValue({
      payment_terms: term
    })
    this.showPaymentTerms = false
  }
}
