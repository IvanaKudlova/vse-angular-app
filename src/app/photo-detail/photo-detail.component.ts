import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../services/app.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit, OnDestroy {
  choosenPhoto: any;
  private subs: Subscription[] = [];
  @Input() photos: any [];

  constructor(private http: HttpClient, private appService: AppService, private sanitizer: DomSanitizer,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subs.push(
      this.activeRoute.params.subscribe(params => {
        console.log(params);
        // TODO GET KONKRETNEJ FOTO podla param.id
        // observable vracia SUbscribtion a to ostava zit vkuse treba sa unsubscribnut
        this.subs.push(
          this.appService.getPhotoById(params.id).subscribe(res => {
            // vracia array, takže vyberiem 0. poziciu
            //console.log(res[0]);
            this.choosenPhoto = res[0];
          }),
        );
      })
    );
    //console.log(this.appService.choosenPhoto);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  deletePhoto(photoId) {
    this.appService.deletePhotoById(photoId).subscribe(res => {
      console.log(res);
    });
  }
}
