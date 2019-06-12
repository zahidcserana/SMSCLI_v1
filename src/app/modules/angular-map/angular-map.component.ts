import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-angular-map',
  templateUrl: './angular-map.component.html',
  styleUrls: ['./angular-map.component.css']
})
export class AngularMapComponent implements OnInit {
  @Input() mapUrl: string;
  iframeUrl: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
 this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

}
