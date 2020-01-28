import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosLibraryComponent } from './photos-library.component';

describe('PhotosLibraryComponent', () => {
  let component: PhotosLibraryComponent;
  let fixture: ComponentFixture<PhotosLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
