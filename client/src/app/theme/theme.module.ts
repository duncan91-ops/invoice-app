import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme.directive';
import { ThemeOptions, ACTIVE_THEME, THEMES } from './symbols';



@NgModule({
  declarations: [
    ThemeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeDirective
  ]
})
export class ThemeModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        {provide: THEMES, useValue: options.themes},
        {provide: ACTIVE_THEME, useValue: options.active},
      ]
    }
  }
}
