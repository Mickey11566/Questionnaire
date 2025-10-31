import { LoadingService } from './../@services/loading.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showLoading!: boolean;

  constructor(private router: Router, private loadingService: LoadingService) { }
  login() {
    this.loadingService.show();
    setTimeout(() => {
      this.router.navigateByUrl('list')
    }, 3000);
  }

  ngOnInit(): void {
    this.loadingService._secondLoading$.subscribe((res) => {
      this.showLoading = res;
    })
  }
}
