import { Component } from '@angular/core';

import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user$ = this.userService.user$

  constructor(private userService: UserService) {}

}
