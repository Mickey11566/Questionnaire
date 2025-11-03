import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


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

  constructor(private router: Router) { }
  finish() {
    console.log("23");

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
