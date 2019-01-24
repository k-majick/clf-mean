import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private flashMsg: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      userUsername: ['', [Validators.required, Validators.minLength(3)]],
      userPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.loginForm.setValue({
      userUsername: '',
      userPassword: '',
    });
  }

  sendLoginForm() {
    const user = {
      username: this.loginForm.controls.userUsername.value,
      password: this.loginForm.controls.userPassword.value,
    }

    if (this.loginForm.controls.userUsername.status == 'INVALID' || this.loginForm.controls.userPassword.status == 'INVALID') {
      this.flashMsg.show('Please enter at least 3 characters', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMsg.show(data.msg, { cssClass: 'alert-success', timeout: 5000 })
        this.router.navigate(['dashboard']);
      } else {
        this.flashMsg.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['login']);
      }
    });
  }

}
