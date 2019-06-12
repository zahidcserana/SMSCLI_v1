import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges
} from "@angular/core";

declare let $: any;

@Component({
  selector: "app-summernote",
  templateUrl: "./summernote.component.html",
  styleUrls: ["./summernote.component.css"]
})
export class SummernoteComponent implements OnChanges, AfterViewInit {
  @Input("className") className: string;
  @Input("height") height: number;
  @Input("value") value: number;
  @Output("changeValue") changeValue: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnChanges() {
    if(this.value) {
      $(".summernote-" + this.className).summernote("code", this.value);
    }
  }

  ngAfterViewInit() {
    this._description();
  }

  private _description = () => {
    $(".summernote-" + this.className).summernote(this.summarNote());

    $(".summernote-" + this.className).on("summernote.blur", () => {
      const value = $(".summernote-" + this.className).summernote("code");
      this.changeValue.emit(value);
    });
    $(".summernote-" + this.className).summernote("code", this.value);
  };

  private summarNote() {
    return {
      height: this.height ? this.height : 300,
      toolbar: [
        ["style", ["style"]],
        [
          "font",
          [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "clear"
          ]
        ],
        ["fontname", ["fontname"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ol", "ul", "paragraph", "height"]],
        ["table", ["table"]],
        ["insert", ["link"]],
        ["view", ["undo", "redo", "fullscreen", "codeview", "help"]]
      ]
    };
  }
}
