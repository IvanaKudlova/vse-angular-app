import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';
import {SocialUser} from 'angularx-social-login';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users-photos-library',
  templateUrl: './users-photos-library.component.html',
  styleUrls: ['./users-photos-library.component.scss']
})
export class UsersPhotosLibraryComponent implements OnInit {
  public myPhotos = [];
  public user = [];
  public userData: any;
  private subs: Subscription[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(this.userData.id);
    this.appService.getUsersPhotos(this.userData.id);
    // subscribe na observable
    console.log('onINIIITI');
    this.appService.myphotos.asObservable().subscribe(data => {
      this.myPhotos = data;
      console.log(data);
    });
  }

  deletePhoto(photoId) {
    this.appService.deletePhotoById(photoId).subscribe(res => {
      console.log(res);
      this.appService.getUsersPhotos(this.userData.id);
    });
  }

}
