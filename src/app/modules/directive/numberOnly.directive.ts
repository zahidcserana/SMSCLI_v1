import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[numberOnly]"
})
export class NumberOnlyDirective {
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

  private specialKeys: Array<string> = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "ArrowRight",
    "ArrowLeft",
    "Delete"
  ];
  private spe = ["Control", "c", "v", "x", "a"];

  private key = null;

  constructor(private el: ElementRef) {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (this.spe.includes(event.key)) {
      if (event.key === "Control") {
        this.key = true;
        return;
      }
      if (this.key) {
        this.key = false;
        return;
      }
    } else {
      this.key = false;
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
