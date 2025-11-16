import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, Validators } from '@angular/forms';


// sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  userEmail!: string;
  userPassword!: string;
  userName!: string;
  userPhone!: string;

  // 密碼隱藏顯示
  pwdHide: boolean = false;

  // 翻轉卡片
  isFlippingOut: boolean = false;

  //密碼長度
  readonly minLength = 6;

  // email及密碼輸入確認
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);
  nameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);

  constructor(private router: Router) { }
  finish() {
    if (this.userEmail &&
      this.userPassword &&
      this.userName &&
      this.userPhone) {
      Swal.fire({
        title: "註冊成功！",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      setTimeout(() => {
        this.router.navigateByUrl('login');
      }, 1600);
    }
    else {
      Swal.fire({
        title: "註冊失敗！",
        text: "請輸入必填的內容",
        icon: "error",
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  goLogin() {
    this.isFlippingOut = true;

    //
    // 設定一個延遲。這個時間必須跟你在 CSS 中設定的 transition 時間（0.6s）匹配
    //
    setTimeout(() => {
      this.router.navigateByUrl('login');
      // 導向後，重設狀態 (雖然元件會被銷毀，但這是個好習慣)
      this.isFlippingOut = false;
    }, 600); // <-- 保持和登入頁面的動畫時間一致

  }
}
