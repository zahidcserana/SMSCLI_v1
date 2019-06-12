import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-inner-html-component',
  template: `
    <section [innerHtml]="html | safeHtml"></section> 
  `,
  styles: [],
  encapsulation: ViewEncapsulation.Native
})
export class InnerHtmlComponentComponent implements OnInit {

  @Input('html') html: string;

  constructor() { }

  ngOnInit() {
  }

}
