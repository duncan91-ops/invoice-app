import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/_services/auth.service';
import { TokenStorageService } from '@app/_services/token-storage.service';
import { ILogin } from '@app/_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  login() {
    const loginData = this.loginForm.value as ILogin;
    this.authService.login(loginData).subscribe({
      next: (token) => {
        this.tokenService.saveToken(token);
        this.router.navigate(['/invoices']);
      },
    });
  }
}
