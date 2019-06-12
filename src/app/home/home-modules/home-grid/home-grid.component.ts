import { Component, OnInit } from '@angular/core';
import { ContentResoveService } from '../../home-service/contetn-resolve.service';

@Component({
  selector: 'home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.css']
})
export class HomeGridComponent implements OnInit {
  grids = [];
  constructor(private service: ContentResoveService) {
    this.grids = this.service.contents && this.service.contents.grid ? this.service.contents.grid : this.gridData;
  }

  ngOnInit() {
  }

  private get gridData() {
    const arr = [];
    for(let a = 0; a < 6; a++) {
      arr.push({
        id: a + 1,
        label: 'Grid ' + (a + 1),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        url: 'https://via.placeholder.com/170x215'
      });
    }
    return arr;
  }
}
