import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(res => {
      // console.log(Object.keys(res['user']));
      this.user = res['user'];
    }, err => {
      console.log(err);
      return false;
    });
  }

}
