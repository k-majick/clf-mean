import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private flashMsg: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.authService.loggedIn());
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMsg.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['login']);
    return false;
  }

}
