  import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { country } from "./codes";

interface flags {
  code: string;
  dial_code: string;
  name: string;
  img?: string;
}

@Component({
  selector: "app-phone-number-input",
  templateUrl: "./phone-number-input.component.html",
  styleUrls: ["./phone-number-input.component.css"]
})
export class PhoneNumberInputComponent implements OnInit {
  flags: flags[] = [];
  countryDetails: flags[] = country;
  selectedFlag: flags;
  invalid: boolean;

  @Output("onPressNumber") onPressNumber: EventEmitter<
    any
  > = new EventEmitter();

  @ViewChild("flagDropdown", { read: ElementRef }) flagDropdown: ElementRef;

  @HostListener('window:click', ['$event']) 
  onClick(event) {
    const className = event.target.className;
    if (!className.includes('dropbtn')) {
      if(!event.target.className.includes('search-form-control'))
        this.render.removeClass(this.flagDropdown.nativeElement, "show");
    }
  }

  constructor(private render: Renderer2) {}

  ngOnInit() {
    this.formatFlags();
    this.selectedFlag = this.flags.find(f => f.code === "US");
  }

  onDropDownClick() {
    if (this.flagDropdown.nativeElement.classList.contains("show")) {
      this.render.removeClass(this.flagDropdown.nativeElement, "show");
    } else {
      this.formatFlags();
      this.render.addClass(this.flagDropdown.nativeElement, "show");
    }
  }

  onFlageSelect(f) {
    this.selectedFlag = f;
    this.render.removeClass(this.flagDropdown.nativeElement, "show");
  }

  onNumberPress(v: string) {
    if (v) {
      this.invalid = false;
      if (v.length === 10) {
        this.onPressNumber.emit({
          valid: true,
          tel: this.selectedFlag.dial_code + v,
          data: this.selectedFlag
        });
      } else {
        this.onPressNumber.emit({ valid: false, tel: null });
      }
    } else {
      this.invalid = true;
      this.onPressNumber.emit({ valid: false, tel: null });
    }
  }

  check(v: string) {
    if (!v || (v && v.length < 10)) {
      this.invalid = true;
      this.onPressNumber.emit({ valid: false, tel: null });
    }
  }

  search(v) {
    this.formatFlags(v);
  }

  private formatFlags(v?: string) {
    this.flags = this.countryDetails
      .filter(f => {
        if (v) {
          const s = v.trim().toLowerCase();
          return (
            f.code.toLowerCase().includes(s) ||
            f.dial_code.includes(s) ||
            f.name.toLowerCase().includes(s)
          );
        }
        return f;
      })
      .map(m => {
        m["img"] = m.code.toLowerCase() + ".png";
        return m;
      });
  }
}
