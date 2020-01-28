import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from './services/app.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PhotosLibraryComponent} from './photos-library/photos-library.component';
import {PhotoUploadComponent} from './photo-upload/photo-upload.component';
import {PhotoDetailComponent} from './photo-detail/photo-detail.component';
import {MapComponent} from './map/map.component';
import {LoginComponent} from './login/login.component';
import {SocialLoginModule, AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule
} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { UpdatePhotoDialogComponent } from './update-photo-dialog/update-photo-dialog.component';
import { UsersPhotosLibraryComponent } from './users-photos-library/users-photos-library.component';


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('215816006113184')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PhotosLibraryComponent,
    PhotoUploadComponent,
    PhotoDetailComponent,
    MapComponent,
    LoginComponent,
    UpdatePhotoDialogComponent,
    UsersPhotosLibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  entryComponents: [
    UpdatePhotoDialogComponent
  ],
  providers: [AppService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false}
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
