import { Directive, ElementRef, HostListener, Renderer } from "@angular/core";

@Directive({
  selector: "[appNavtoggle]"
})
export class NavtoggleDirective {
  isOpen = false;
  sidebar:any
  constructor(private renderer: Renderer, private el: ElementRef) {

  }


}
