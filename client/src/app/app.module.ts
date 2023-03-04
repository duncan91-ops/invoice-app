import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { darkTheme } from './theme/dark-theme';
import {lightTheme} from './theme/light-theme'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThemeModule.forRoot({themes: [darkTheme, lightTheme], active: 'light'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
