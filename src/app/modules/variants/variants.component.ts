import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css']
})
export class VariantsComponent implements OnInit {

  @Input('variants') variants: any [];
  @Output('values') values: EventEmitter<any> = new EventEmitter();

  iteration: any[] = [{id: 1, set_id: null, ids: []}];
  allVariants: any [] = [];

  constructor() { }

  ngOnInit() {
    this.allVariants.push(this.variants);
    // console.log(this.allVariants)
  }

  changedVariant(e, i) {
    this.iteration[i].set_id = e.id;
    this.values.emit(this.iteration);
    this.resetAllVariant();
  }

  deleteVariants(i) {
    this.iteration.splice(i, 1);
    this.allVariants.splice(i, 1);
    this.values.emit(this.iteration);
    this.resetAllVariant();
  }

  private resetAllVariant() {
    this.iteration.forEach( (f, i) => {
      const ids = this.iteration.filter( a => a.set_id !== f.set_id).map( m => m.set_id);
      this.allVariants[i] = this.variants.filter( v => !ids.includes(v.id));
    });
    // console.log(this.allVariants, this.iteration)
  }

  addAnother() {
    this.iteration.push({id: this.iteration.length + 1, set_id: null, ids: []});
    this.resetAllVariant();
  }

   // findAttribute(i) {
  //   return this.variants.find((f) => f.id === i.set_id).variants;
  // }

  // changedVariantValue(e, i) {
  //   console.log(e, i)
  // }

}
