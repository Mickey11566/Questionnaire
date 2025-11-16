import { Component } from '@angular/core';

// Material套件
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-form',
  imports: [MatIconModule],
  templateUrl: './check-form.component.html',
  styleUrl: './check-form.component.scss'
})
export class CheckFormComponent {

  constructor(private router: Router) { }


  checkList() {
    this.router.navigateByUrl("manage");
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
