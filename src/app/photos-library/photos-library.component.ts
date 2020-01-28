import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../services/app.service';

@Component({
  selector: 'photos-library',
  templateUrl: './photos-library.component.html',
  styleUrls: ['./photos-library.component.scss']
})
export class PhotosLibraryComponent implements OnInit, AfterViewInit {
  public photoss = [];
  loggedIn: boolean;

  constructor(public appService: AppService) {
  }

  ngOnInit() {
    this.appService.isLoggedIn().subscribe(res => {
      this.loggedIn = res;
      console.log(this.loggedIn);
    });
  }

  ngAfterViewInit(): void {
    this.appService.getPhotos();
    // subscribe na observable
    this.appService.photos.asObservable().subscribe(data => {
      this.photoss = data;
    });
  }
}
