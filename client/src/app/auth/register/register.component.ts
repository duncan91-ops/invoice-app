import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required, Validators.maxLength(50)],
      last_name: ['', Validators.required, Validators.maxLength(50)],
      email: ['', Validators.email, Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
    })
  }
}
