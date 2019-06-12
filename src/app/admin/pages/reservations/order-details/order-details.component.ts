import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { SidebarService } from '../../sidebar-service/sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  sidebarOpen: boolean;
  order_id: number;
  sub: Subscription[] = []; 
  listPath: string = 'all';


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(this.sidebarOpen) this.sidebarS.openSidebar();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sidebarS: SidebarService
  ) {
    this.checkRoute();
    this.order_id = this.route.snapshot.params.order_id;
   }

  ngOnInit() {
    window.scrollTo(0, 0);
    const path = sessionStorage.getItem('lastUrl');
    if(path) {
      this.listPath = path;
    }
  }

  ngAfterViewInit() {
    this.closeEdit();
  }

  ngOnDestroy() {
    for(let sub of this.sub) {
      sub.unsubscribe();
    }
  }

  private checkRoute(){
    const event = this.router.events
      this.sub[0] =  event.pipe(map((e) => {
              const orderEdit = this.router.createUrlTree(['edit'], {relativeTo: this.route});
              return this.router.isActive(orderEdit, false);
          })).subscribe(active => {
            if(active) { 
              this.sidebarS.openSidebar();
            }else {
              this.sidebarS.removeSidebar();
            }
            this.sidebarOpen = active;
      });
  }

  private closeEdit() {
    $('.close-sidebar').click((e) => {
      e.preventDefault();
      this.close(); 
    });
    $('.close-sidebar-upper').click((e)=>{
      e.preventDefault();
      this.close();
    });
  }

  private close() {
    this.sidebarOpen = false;
    this.sidebarS.removeSidebar();
    let loc = `admin/reservations/${this.order_id}/details`;
    this.router.navigate([loc]);
  }

}
