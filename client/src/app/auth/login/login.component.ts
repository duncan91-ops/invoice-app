import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ILogin } from '../auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  login() {
    const loginData = this.loginForm.value as ILogin
    this.authService.login(loginData)
  }
}
