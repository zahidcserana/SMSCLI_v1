import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GET_USER } from '../../../../globals/_classes/functions';
import { Router } from '@angular/router';
import { EndPoint } from '../../../../globals/endPoint/config';
import { AlertService } from '../../../../modules/alert/alert.service';

class User {
  store_id: number;
  user_id: number;
}

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent implements OnInit {

  uploadInfo: User = new User();
  url = EndPoint + 'products/excel';
  downloadApi;
  imageUrl = EndPoint + 'image-upload';

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private router: Router,
    private alertS: AlertService 
  ) { 
    this.downloadApi = EndPoint + 'products/download/sample';
  }

  ngOnInit() {
    let user = GET_USER();
    this.uploadInfo.store_id = user.store_id;
    this.uploadInfo.user_id = user.user_id
  }

  uploadFiles(e) {
    this.alertS.success(this.alertContainer, e.status.result.data + ' item(s) have been successfully uploaded', true, 5000);
  }

  uploadImages(e) {
    this.alertS.success(this.alertContainer, 'Image(s) have been successfully uploaded', true, 5000);
  }

  gotoList() {
    this.router.navigate(['/admin/inventory']);
  }

}
