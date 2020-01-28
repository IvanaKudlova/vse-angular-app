import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PhotoDetailComponent} from './photo-detail/photo-detail.component';
import {PhotosLibraryComponent} from './photos-library/photos-library.component';
import {PhotoUploadComponent} from './photo-upload/photo-upload.component';
import {UsersPhotosLibraryComponent} from './users-photos-library/users-photos-library.component';


const routes: Routes = [
  { path: '', redirectTo: '/photos-library', pathMatch: 'full' },
  {
    path: 'photos-library',
    component: PhotosLibraryComponent,
    pathMatch: 'full'
  },
  {
    path: 'photo-detail/:id',
    component: PhotoDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'photo-upload',
    component: PhotoUploadComponent,
    pathMatch: 'full'
  },
  {
    path: 'users-photos',
    component: UsersPhotosLibraryComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
