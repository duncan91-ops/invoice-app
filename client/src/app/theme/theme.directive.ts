import { Directive, OnInit, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit {
  private unsubscribe = new Subject()

  constructor(private _themeService: ThemeService, private _elementRef: ElementRef) { }

  ngOnInit() {
    const active = this._themeService.getActiveTheme()
    if (active) {
      this.updateTheme(active)
    }
    this._themeService.themeChange.pipe(takeUntil(this.unsubscribe)).subscribe((theme: Theme) => this.updateTheme(theme))
  }

  updateTheme(theme: Theme) {
    for (const key in theme.properties) {
      this._elementRef.nativeElement.style.setProperty(key, theme.properties[key])
    }
  }
}
