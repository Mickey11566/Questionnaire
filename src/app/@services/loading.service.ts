import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private secondLoading$ = new Subject<boolean>();

  _loading$ = this.loading$.asObservable();
  _secondLoading$ = this.secondLoading$.asObservable();


  show() {
    this.secondLoading$.next(true);
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.secondLoading$.next(false);
  }
  constructor() { }
}
