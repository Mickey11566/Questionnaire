import { LoadingService } from './../@services/loading.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


// sweetalert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userEmail!: string;
  userPassword!: string;

  // 載入動畫
  showLoading!: boolean;

  // 密碼隱藏顯示
  pwdHide: boolean = true;

  //翻轉卡片
  isFlipping: boolean = false;

  constructor(private router: Router, private loadingService: LoadingService) { }
  login() {
    if (this.userEmail == "123" || this.userPassword == "123") {
      Swal.fire({
        title: "登入失敗!",
        text: "帳號或密碼格式錯誤",
        icon: "error",
      });
    }
    else {
      this.loadingService.show();
      setTimeout(() => {
        this.router.navigateByUrl('list')
      }, 600);
    }
  }

  goRegister() {
    this.isFlipping = true;
    setTimeout(() => {
      this.router.navigateByUrl('register');
      this.isFlipping = false;
    }, 600)
  }

  admin() {
    this.router.navigateByUrl('admin');

  }

  ngOnInit(): void {
    this.loadingService._secondLoading$.subscribe((res) => {
      this.showLoading = res;
    })
  }
}
