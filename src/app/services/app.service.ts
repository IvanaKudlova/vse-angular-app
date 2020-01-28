import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {UpdatePhotoDialogComponent} from '../update-photo-dialog/update-photo-dialog.component';
import {environment} from '../../environments/environment';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user: SocialUser = null;
  photos: Subject<any[]>;
  myphotos: Subject<any[]>;
  photoList: Array<any[]> = [];
  photo: any;
  imageSource;
  imageSources: any[] = [];
  choosenPhoto: any[];
  getPhotosAdress = 'https://serveros.herokuapp.com/photos';
  getPhotoAdress = 'https://serveros.herokuapp.com/photos?id=';
  private logger = new Subject<boolean>();
  loggedIn: boolean;


  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private dialog: MatDialog, private authService: AuthService, ) {
    this.photos = new Subject<any[]>();
    this.myphotos = new Subject<any[]>();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.loggedIn = true;
    this.logger.next(this.loggedIn);
  }

  isLoggedIn(): Observable<boolean> {
    console.log('íslogged');
    return this.logger.asObservable();
  }

  signOut(): void {
    if (this.user !== null) {
      this.user = null;
    }
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
  }

  getPhotos() {
    this.http.get(this.getPhotosAdress).subscribe((data: any[]) => {
      // this.photos = data;
      for (const photo of data) {
        photo.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${photo.sellersPermitFile}`);
      }
      this.photos.next(data);
    });
  }

// get jedenu fotoserver vracia vzdy array my bereme len prvu
  getPhotoById(photoId): Observable<any> {
    return this.http.get(this.getPhotoAdress + photoId).pipe(
      map(res => {
        console.log(res);
        res[0].imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res[0].sellersPermitFile}`);
        return res;
      })
    );
  }

  getUsersPhotos(userId) {
    this.photoList = [];
    this.http.get(this.getPhotosAdress).subscribe((data: any[]) => {
      for (const photo of data) {
        photo.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${photo.sellersPermitFile}`);
        if (photo.userId === userId) {
          console.log('in if');
          this.photoList.push(photo);
        }
      }
      this.myphotos.next(this.photoList);
    });
  }

  deletePhotoById(photoId): Observable<any> {
    console.log('DELETE');
    const url = this.getPhotosAdress + '/' + photoId;
    const search = new URLSearchParams();
    search.set('id', photoId);
    return this.http.delete<any>(url).pipe(
      map(res => {
        console.log(res);
        }
      )
    );

  }

  getPhoto() {
    this.http.get(this.getPhotosAdress).subscribe((photo: any) => {
      this.photo = photo;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdatePhotoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
