import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '@app/_services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, private authService: AuthService, private location: Location) {}

  leave() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  goBack() {
    this.location.back()
  }
}
