import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  activate() {
    const activationData = {
      uid: this.route.snapshot.paramMap.get('uid') || '',
      token: this.route.snapshot.paramMap.get('token') || ''
    }
    this.authService.activate(activationData).subscribe({
      next: () => {
        console.log('done')
        this.router.navigate(['/'])
      },
      error: (err) => console.log(err)
    })
  }
}
