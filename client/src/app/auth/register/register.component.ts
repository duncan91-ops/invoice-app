import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IRegister } from '../auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      re_password: ['', [Validators.required, Validators.minLength(8)]],
    })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  register() {
    const registerData = this.registerForm.value as IRegister
    this.authService.register(registerData).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/'])
      }, 
      error: (err) => console.log(err)
    })
  }
}
