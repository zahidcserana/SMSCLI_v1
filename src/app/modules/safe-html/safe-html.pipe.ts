import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value, key: string): any {
    switch (key) {
      case 'Style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'Script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'Url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'ResourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }

}

// use: safeHtml: 'key name' (ex: value | safeHtml: 'Style')

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule,
  ],
  exports: [SafeHtmlPipe]
})
export class SafeHtmlModule { }
