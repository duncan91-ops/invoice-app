import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = this.authService.getToken()
    if (token) {
      this.authService.getInitialUser(token)
    }
  }
}
