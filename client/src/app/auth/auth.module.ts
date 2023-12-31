import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ActivateComponent, LogoutComponent, AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  exports: [ReactiveFormsModule]
})
export class AuthModule { }
