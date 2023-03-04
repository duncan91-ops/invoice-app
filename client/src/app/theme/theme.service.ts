import { Injectable, Inject, EventEmitter } from '@angular/core';
import { ACTIVE_THEME, Theme, THEMES } from './symbols';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeChange = new EventEmitter<Theme>()

  constructor(@Inject(ACTIVE_THEME) public theme: string, @Inject(THEMES) public themes: Theme[]) { }

  getActiveTheme() {
    const theme = this.themes.find(t => t.name === this.theme)
    if (!theme) {
      throw new Error(`Theme not found: '${this.theme}'`)
    }
    return theme;
  }

  setTheme(name: string) {
    this.theme = name
    this.themeChange.emit(this.getActiveTheme())
  }
}
