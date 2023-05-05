import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      sender_address: this.fb.group({
        street: '',
        city: '',
        post_code: '',
        country: '',
      }),
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
    return <FormArray>this.addForm.get('items')
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
    this.addForm.patchValue({
      status: 'Draft',
    })
    console.log(this.addForm.value)
  }

  saveAndSend() {
    this.addForm.patchValue({
      status: 'Pending',
    })
    console.log(this.addForm.value)
  }
}
