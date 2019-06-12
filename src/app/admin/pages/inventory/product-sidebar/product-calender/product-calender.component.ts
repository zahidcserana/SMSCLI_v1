import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import 'bootstrap';
import { formateCalenderDate, FORMAT_DATE, calandarDateFormat } from '../../../../../globals/_classes/functions';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { CartService } from '../../../../cart-service/cart.service';
import { Subscription } from 'rxjs';
import { AttributManage } from '../product_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReserveDialogBoxComponent } from './reserve-dialog-box/reserve-dialog-box.component';


@Component({
  selector: 'app-product-calender',
  templateUrl: './product-calender.component.html',
  styleUrls: ['./product-calender.component.css']
})
export class ProductCalenderComponent implements OnInit, AfterViewInit, OnDestroy {

  private type: string = 'month';
  private today: string = '';
  private eventList = [];
  pro_id: number;
  sub: Subscription[] = [];
  variants_products_id;
  attributeList: AttributManage[] = [];

  constructor(
    private router: Router,
    private service: InventoryService,
    private sidebarS: SidebarService,
    private modal: NgbModal,
    private cartS: CartService,
    private activeRoute: ActivatedRoute
  ) {
    this.sub[0] = this.activeRoute.data.subscribe(
      val => {
        this.pro_id = +this.service.getProId(this.activeRoute);
        const attList = val['list'].result.data;
        if (attList && attList.length > 0) {
          this.getAttribute(attList);
        }
      }
    );
  }

  ngOnInit() {
    this.sub[1] = this.cartS.reloadCalander.subscribe(
      val => {
        if (val) this.getRentelList();
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.startCalender();
    }, 500);
  }

  ngOnDestroy() {
    (<any>$('.cus-popover')).popover('hide');
    (<any>$('.popover')).popover('hide');
    $('#m_calendar').fullCalendar('destroy');
    this.sub.forEach(f => f.unsubscribe());
  }

  private getAttribute(attList) {
    this.attributeList = attList.map((m) => {
      m['id'] = m.ids[m.ids.length - 1];
      m['chain'] = m.variant_set.map((a) => a.variant_set_name + '(' + a.name + ')').join(', ');
      m['set_id'] = m.variant_set.length > 0 ? m.variant_set[0].variant_set_id : null;
      return m;
    });
    if (this.attributeList.length > 0) {
      let attr = this.attributeList.find(f => {
        return f.default;
      });
      this.variants_products_id = attr ? attr.id : this.attributeList[0].id;
    }
    this.getRentelList();
  }

  attributeChange() {
    this.getRentelList();
  }

  get unassign() {
    return this.attributeList.map(m => m['set_id']).includes(1);
  }

  private startCalender() {
    this.calendarBasic();
    $('.fc-month-button').click(() => {
      this.changeMode();
    })
    $('.fc-listWeek-button').click(() => {
      this.changeMode();
    })
    $('.fc-prev-button').click(() => {
      this.changeMode();
    })
    $('.fc-next-button').click(() => {
      this.changeMode();
    })
    $('.fc-today-button').click(() => {
      this.changeMode();
    })
  }

  private calendarBasic() {
    $('#m_calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listWeek,agendaDay'
      },
      navLinks: true,
      footer: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listWeek,agendaDay'
      },
      timeFormat: 'h:mm t',
      validRange: {
        start: FORMAT_DATE(new Date)
      },
      events: this.eventList,
      eventRender: (event, element, view) => {
        this.addToolTip(element, event);
        element.addClass('cursor-pointer cus-popover');
        element.click(() => {
          if (event.type === 'available') {
            $('.availability-close').click(() => {
              (<any>$(element)).popover('hide');
            });
            this.clickAvailability(element, event);
          } else if (event.type === 'pickup') {
            this.navigate(event);
          } else {
            (<any>$('.popover')).popover('hide');
            this.openDiaglogBox(event);
          }
        });
      }
    });
  }

  private clickAvailability(element, event) {
    $('.popover .popover-body .availability-container .availability-container-items').click((e) => {
      if (event.qty > 0) {
        (<any>$('.popover')).popover('hide');
        if (e.target.dataset.type === 'create') {
          this.openCartSidebar(event.product);
        } else {
          setTimeout(() => {
            this.openDiaglogBox(event);
          }, 100);
        }
      }
    });
  }

  private openDiaglogBox(event) {
    const modalRef = this.modal.open(ReserveDialogBoxComponent, {
      centered: true
    });
    modalRef.componentInstance.event = event;
    modalRef.componentInstance.edit = event.reserve > 0 ? true : false;
    modalRef.result
      .then(
        result => {
          if (result) {
            this.getRentelList();
          }
        },
        rea => rea
      );
  }

  private addToolTip(element, event) {
    this.hidePopOver(element);
    if (event.type === 'pickup') {
      element.popover({
        title: 'Rental Details',
        content: event.content,
        html: true,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
    } else if (event.type === 'available') {
      element.popover({
        title: `Actions <span class="float-right cursor-pointer availability-close"><i class="fa fa-close"></i></span>`,
        content: `<div class="availability-container">
          <a class="availability-container-items m-2 ${event.qty > 0 ? '' : 'block-pointer'}" data-type="create"><i class="fa fa-plus"></i> Create Order</a>
          <a class="availability-container-items m-2 ${event.qty > 0 ? '' : 'block-pointer'}"" data-type="reserve"><i class="fa fa fa-calendar-times-o"></i> Make Unavailable</a>
        </div>`,
        html: true,
        placement: 'top',
        trigger: 'click',
        container: 'body'
      });
    }
  }

  private hidePopOver(element) {
    element.popover('hide');
  }


  private navigate(e) {
    const sta = [1, 2, 3, 7];
    (<any>$('.popover')).popover('hide');
    if (sta.includes(e.status)) {
      this.router.navigate([`/admin/reservations/${e.id}/details/edit/product`], {
        queryParams: {
          param: e.v_id
        }
      });
    } else {
      this.router.navigate([`/admin/reservations/${e.id}/details`]);
    }

  }

  private changeMode() {
    this.today = $('#m_calendar').fullCalendar('getDate').format();
    this.type = $('#m_calendar').fullCalendar('getView').type;
    this.getRentelList();
  }



  private getRentelList() {
    const params = formateCalenderDate(this.type, this.today);
    this.service.getCalenderData(this.pro_id, params, this.variants_products_id)
      .subscribe(
        res => {
          this.formatEvent(res);
          $('#m_calendar').fullCalendar('removeEvents');
          $('#m_calendar').fullCalendar('addEventSource', this.eventList);
          $('#m_calendar').fullCalendar('rerenderEvents');
        },
        err => console.log(err)
      );
  }

  private formatEvent(data) {
    this.eventList = [];

    if (Object.keys(data).length > 0) {
      for (const t in data) {
        for (const d of data[t]) {
          let obj = {};
          if (t === 'available') {
            obj = {
              id: this.pro_id,
              product: { id: this.pro_id, name: d.product.name, date: d.date, variant: data['variant'] },
              title: `${d.available} Available`,
              start: d.date,
              qty: d.available,
              reserve: d.reserve,
              type: 'available',
              className: `m-fc-event--light m-fc-event--solid-success`
            };
            this.eventList.push(obj);

            if (d.reserve) {
              obj = {
                id: this.pro_id,
                product: { id: this.pro_id, name: d.product.name, date: d.date, variant: data['variant'] },
                title: `${d.reserve} Not Available`,
                start: d.date,
                qty: d.available,
                reserve: d.reserve,
                type: 'reserve',
                className: `m-fc-event--light m-fc-event--solid-danger`
              };
              this.eventList.push(obj);
            }
          } else if (t === 'pickup') {
            obj = {
              id: d.order_id,
              title: `Order Id: ${d.order_id} (Qty: ${d.quantity})`,
              start: d.rent_start,
              end: d.rent_end ? d.rent_end : d.rent_start,
              type: 'pickup',
              content: `
                ${d.variant ? '<b>Variant: </b>' + d.variant + '<br>' : ''}
                <b>Start: </b>${calandarDateFormat(d.rent_start)}<br> 
                <b>End: </b>${calandarDateFormat(d.rent_end ? d.rent_end : d.rent_start)}
                `,
              status: d.status,
              v_id: d.variants_products_id,
              className: `m-fc-event--light m-fc-event--solid-brand`
            };
            this.eventList.push(obj);
          }

        }
      }
    }

  }

  private openCartSidebar(pro) {
    this.cartS.getProductId({ id: pro.id, name: pro.name, date: pro.date, variant: pro.variant });
    this.sidebarS.openCartSidebar();
    this.sidebarS.sidebarOpenChange(true);
  }



}
