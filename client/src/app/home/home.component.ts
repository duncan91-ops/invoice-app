import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.userService.user$;
  registration: string | null = null;
  activation: string | null = null;
  successMessage = '';
  failureMessage = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.registration = this.route.snapshot.queryParamMap.get('registration');
    this.activation = this.route.snapshot.queryParamMap.get('activation');
    if (this.registration === 'success') {
      this.successMessage =
        'Registration successful. Check your email to activate account.';
    } else if (this.registration === 'failure') {
      this.failureMessage = 'Registration failed. Please try again later.';
    }

    if (this.activation && this.activation === 'success') {
      this.successMessage = 'Account activated. You can Log In now to begin.';
    } else if (this.activation === 'failure') {
      this.failureMessage = 'Activation failed. Please try again later.';
    }
  }
}
