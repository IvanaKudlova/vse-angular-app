import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../services/app.service';
import {environment} from '../../environments/environment';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-photo-dialog',
  templateUrl: './update-photo-dialog.component.html',
  styleUrls: ['./update-photo-dialog.component.scss']
})
export class UpdatePhotoDialogComponent implements OnInit{
  file: File;
  sellersPermitFile: any;
  // base64s
  sellersPermitString: string;
  // json
  finalJson = {};
  photoTitle: string;
  lat: number;
  lng: number;
  user: SocialUser;
  isPicked = false;

  constructor(private http: HttpClient, private appService: AppService, private authService: AuthService,
              public dialogRef: MatDialogRef<UpdatePhotoDialogComponent>) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }


  onSubmit() {
    this.finalJson = {
      sellersPermitFile: this.sellersPermitString,
      title: this.photoTitle,
      userId: this.user.id,
      author: this.user.firstName,
      lat: this.lat,
      lng: this.lng
    };
    // this.http.post('http://localhost:3000/pho`${environment.backendUrl}os', this.finalJson)
    this.http.post(`${environment.backendUrl}/photos`, this.finalJson)
      .subscribe(res => {
      });
  }

  close() {
    this.dialogRef.close();
  }

  public picked(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.sellersPermitFile = file;
      this.handleInputChange(file); // turn into base64
      this.isPicked = true;
    } else {
      alert('No file selected');
    }
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.sellersPermitString = base64result;
  }
}
