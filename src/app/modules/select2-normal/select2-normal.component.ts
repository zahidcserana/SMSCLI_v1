import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnInit
} from "@angular/core";

declare let $: any;

@Component({
  selector: "app-select2-normal",
  templateUrl: "./select2-normal.component.html",
  styleUrls: ["./select2-normal.component.css"]
})
export class Select2NormalComponent implements  OnChanges, OnInit, AfterViewInit {
  @Input("data") data: any[]; // compolsary should have 'name' field
  @Input("domId") domId: string; // For multiple select 2 use in same component
  @Input("allowClear") allowClear: boolean; //
  @Input("value") value: any;
  @Input("placeholder") placeholder: string; // only Field name
  @Output("changeValue") changeValue: EventEmitter<any> = new EventEmitter(); // compolsary

  constructor() {}

  ngOnChanges() {
    if (this.value) {
      setTimeout(() => {
        this.setValue(this.value);
      }, 100);
    }
  }

  ngOnInit() {
    this.domId = this.domId ? this.domId : "";
    this.placeholder = this.placeholder ? this.placeholder : "One";
  }

  ngAfterViewInit() {
    this.options();
    this.change();
  }

  private options() {
    $("#select2_add_option" + this.domId).select2({
      dropdownParent: $("#select2_add_option_parent" + this.domId),
      placeholder: `-Select ${this.placeholder}-`
    });
  }

  change() {
    $("#select2_add_option" + this.domId).on("select2:select", e => {
      const value = e.params.data;
      if (value) {
        this.changeValue.emit({ id: +value.id });
      }
    });
  }

  setValue(value) {
    $("#select2_add_option" + this.domId)
      .val(value)
      .trigger("change.select2");
  }

  reset() {
    this.setValue(0);
    this.changeValue.emit({ id: 0 });
  }
}
