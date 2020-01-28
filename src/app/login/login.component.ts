import {Component, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser = null;
  loggedIn: boolean = false;
  userData: any;

  constructor(private authService: AuthService, private appService: AppService) {
    this.appService.isLoggedIn().subscribe(res => {
      this.loggedIn = res;
    });
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      this.authService.authState.subscribe(user => {
        //console.log('constructor');
        if (user) {
          this.user = user;
          this.loggedIn = (user != null);
          localStorage.setItem('user', JSON.stringify(this.user));
          JSON.parse(localStorage.getItem('user'));
        } else {
          this.loggedIn = false;
          localStorage.setItem('user', null);
          this.user = null;
          JSON.parse(localStorage.getItem('user'));
        }
      });
    } else {
      this.loggedIn = true;
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

}
