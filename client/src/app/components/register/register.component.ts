import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  name: String;
  username: String;
  email: String;
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
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userUsername: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      userPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.registerForm.setValue({
      userName: '',
      userUsername: '',
      userEmail: '',
      userPassword: '',
    });
  }

  sendRegisterForm() {
    const user = {
      name: this.registerForm.controls.userName.value,
      username: this.registerForm.controls.userUsername.value,
      email: this.registerForm.controls.userEmail.value,
      password: this.registerForm.controls.userPassword.value,
    }

    if (this.registerForm.controls.userName.status == 'INVALID' || this.registerForm.controls.userUsername.status == 'INVALID' || this.registerForm.controls.userName.status == 'INVALID') {
      this.flashMsg.show('Please enter at least 3 characters', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (this.registerForm.controls.userEmail.status == 'INVALID') {
      this.flashMsg.show('Please enter a valid e-mail address', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMsg.show(data.msg, { cssClass: 'alert-success', timeout: 5000 })
        this.router.navigate(['login']);
      } else {
        this.flashMsg.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['register']);
      }
    });
  }

}
