import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { darkTheme } from './theme/dark-theme';
import {lightTheme} from './theme/light-theme';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    InvoicesModule,
    ProfileModule,
    ThemeModule.forRoot({themes: [darkTheme, lightTheme], active: 'light'}),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
