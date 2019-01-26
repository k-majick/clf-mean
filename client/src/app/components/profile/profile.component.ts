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
    this.authService.getProfile();
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
    });
    // this.authService.getProfile().subscribe(profile => {
    //   this.user = profile.user;
    // }, err => {
    //   console.log(err);
    //   return false;
    // });
  }

}
