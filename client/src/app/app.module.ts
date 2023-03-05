import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { darkTheme } from './theme/dark-theme';
import {lightTheme} from './theme/light-theme';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { NavComponent } from './nav/nav.component';
import { InvoicesModule } from './invoices/invoices.module';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    InvoicesModule,
    ProfileModule,
    ThemeModule.forRoot({themes: [darkTheme, lightTheme], active: 'light'}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
