import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPhotosLibraryComponent } from './users-photos-library.component';

describe('UsersPhotosLibraryComponent', () => {
  let component: UsersPhotosLibraryComponent;
  let fixture: ComponentFixture<UsersPhotosLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPhotosLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPhotosLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
