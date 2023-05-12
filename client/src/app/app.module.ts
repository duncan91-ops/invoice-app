import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ThemeModule } from './theme/theme.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { darkTheme } from './theme/dark-theme';
import {lightTheme} from './theme/light-theme';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    InvoicesModule,
    ProfileModule,
    ThemeModule.forRoot({themes: [darkTheme, lightTheme], active: 'light'}),
    SharedModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
