import {InjectionToken} from '@angular/core'

export const ACTIVE_THEME = new InjectionToken<string>('ACTIVE_THEME')
export const THEMES = new InjectionToken<Theme[]>('THEMES')

export interface Theme {
  name: string;
  properties: {
    [key: string]: string;
  }
}

export interface ThemeOptions {
  themes: Theme[];
  active: string;
}