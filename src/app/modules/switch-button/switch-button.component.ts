import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";

declare let $: any;

@Component({
  selector: "app-switch-button",
  templateUrl: "./switch-button.component.html",
  styleUrls: ["./switch-button.component.css"]
})
export class SwitchButtonComponent implements OnInit, AfterViewInit {
  @Input("domId") domId: string;
  @Input("name") name: string;
  @Input("value") value;
  @Input("size") size: string;
  @Input("onText") onText: string;
  @Input("offText") offText: string;
  @Input("onColorClass") onColorClass: string;
  @Input("offColorClass") offColorClass: string;
  @Output("changeValue") changeValue: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.domId = this.domId ? this.domId : "";
    this.name = this.name ? this.name : "name";
    this.size = this.size ? this.size : "small";
    this.onText = this.onText ? this.onText : "Yes";
    this.offText = this.offText ? this.offText : "No";
    this.onColorClass = this.onColorClass ? this.onColorClass : "success";
    this.offColorClass = this.offColorClass ? this.offColorClass : "danger";
  }

  ngAfterViewInit() {
    this.showBootstrapToggle();
  }

  private showBootstrapToggle() {
    $("#open-" + this.domId).bootstrapSwitch();
    $("#open-" + this.domId).on("switchChange.bootstrapSwitch", () => {
      this.value = !this.value;
      this.changeValue.emit(this.value);
    });
  }
}
