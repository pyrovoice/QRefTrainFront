import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  animations: [
    trigger('loginAnimation', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('200ms', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('0ms', style({ display: 'hidden' }))
      ])
    ]),
    trigger('registerAnimation', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('200ms', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('0ms', style({ display: 'hidden' }))
      ])
    ]),
    trigger('changePasswordAnimation', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('200ms', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('0ms', style({ display: 'hidden' }))
      ])
    ])
  ]
})
export class LoginContainerComponent  {

  showLogin = true;
  showRegister = false;
  showChangePassword = false;

  constructor() { }

  loadLogin() {
    this.showLogin = true;
    this.showRegister = false;
    this.showChangePassword = false;
  }

  loadRegister() {
    this.showLogin = false;
    this.showRegister = true;
    this.showChangePassword = false;
  }

  loadChangePassword() {
    this.showLogin = false;
    this.showRegister = false;
    this.showChangePassword = true;
  }

}
