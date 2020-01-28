import {Component, OnInit} from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {AppService} from './services/app.service';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PhotoUploadComponent} from './photo-upload/photo-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'angular-app';
  user: Subject<any[]>;
  loggedIn: boolean;

  constructor(private authService: AuthService, private appService: AppService,private dialog: MatDialog) {
    this.user = new Subject<any[]>();
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(PhotoUploadComponent, dialogConfig);
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.loggedIn = true;
    }else{
      this.loggedIn =false;
    }
    this.appService.isLoggedIn().subscribe( res => {
      this.loggedIn = res;
      console.log('res');
      console.log(res);
    });
  }

}
