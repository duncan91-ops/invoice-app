import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'src/app/theme/theme.service';
import { Theme } from 'src/app/theme/symbols';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  themeName!: string;
  user$ = this.userService.user$

  constructor(private themeService: ThemeService, private userService: UserService) {}

  ngOnInit() {
    const theme: Theme = this.themeService.getActiveTheme()
    this.themeName = theme.name
  }

  changeTheme() {
    if (this.themeName === 'light') {
      this.themeService.setTheme('dark')
      this.themeName = 'dark'
    } else if (this.themeName === 'dark') {
      this.themeService.setTheme('light')
      this.themeName = 'light'
    }
  }
}
