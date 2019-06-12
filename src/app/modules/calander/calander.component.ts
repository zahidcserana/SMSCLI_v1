import { Component, AfterViewInit, ElementRef, OnDestroy, Input, EventEmitter, OnInit, OnChanges } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import 'bootstrap';
import { Router } from '@angular/router';
import { HttpService } from '../http-with-injector/http.service';
import { formateCalenderDate, calandarDateFormat } from '../../globals/_classes/functions';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

declare let moment: any;

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnChanges, AfterViewInit, OnDestroy {

  private type: string = 'month';
  private today: string = '';
  private eventList = [];
  
  @Input('status') status: string;

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnChanges() {
    this.getRentelList(); 
  }

  ngAfterViewInit() {
    this.startCalender();
  }

  ngOnDestroy() {
    $('#m_calendar').fullCalendar('destroy');

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

  private calendarBasic () {
    $('#m_calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,listWeek,agendaDay'
        },
        navLinks: true,
        timeFormat: 'h:mm t',
        events: this.eventList,
        eventRender: (event, element, view) => {
            this.addToolTip(element, event);
            element.addClass('cursor-pointer');
            element.click( () => {
                this.navigate(event);
            })
        }
    });
  }

  private addToolTip(element, event) {
      element.popover({
        title: this.status === 'pickup' ? 'Pickup' : 'Returned',
        content: event.content,
        html: true,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
      element.click( () => {
        element.popover('hide');
      });
  }

  private navigate(e) {
    const sta = [1, 2, 3, 7];
    if(this.status === 'pickup' && sta.includes(e.status)) {
      this.router.navigate([`/admin/reservations/${e.id}/details/edit/product`], {queryParams: {
        param: e.v_id
      }});
    } else {
      this.router.navigate([`/admin/reservations/${e.id}/details`]);
    }             
  }

  private changeMode() {
    this.today = $('#m_calendar').fullCalendar('getDate').format();
    this.type = $('#m_calendar').fullCalendar('getView').type;
    this.getRentelList();
  }



  getRentelList() {
    const params = formateCalenderDate(this.type, this.today);
    this.http.get(`calendar/order?type=${this.status}&start_date=${params.start_date}&end_date=${params.end_date}`).pipe( map ( res => res.result.data), catchError( err => of([])))
    .subscribe(
        res => {
            this.formatEvent(res);
            $('#m_calendar').fullCalendar( 'removeEvents');
            $('#m_calendar').fullCalendar( 'addEventSource', this.eventList );
            $('#m_calendar').fullCalendar( 'rerenderEvents' );
        }
    );
  }

  private formatEvent(data) {
    this.eventList = [];
    for (const d of data) {
        if(this.status === 'pickup') {
            const obj = {
                id: d.order_id, 
                title: ` Order Id: ${d.order_id} (${d.product.name})`, 
                start: d.rent_start, 
                end: d.rent_end ? d.rent_end : d.rent_start, 
                status: d.status,
                content: `
                ${d.variant ? '<b>Variant: </b>' + d.variant + '<br>' : ''}
                <b>Qty: </b>${d.quantity}</b><br>
                <b>Start: </b>${calandarDateFormat(d.rent_start)}<br> 
                <b>End: </b>${calandarDateFormat(d.rent_end ? d.rent_end : d.rent_start)}
                `,
                v_id: d.variants_products_id,
                className: `m-fc-event--light m-fc-event--solid-brand`
            };
            this.eventList.push(obj);
        } else {
            const obj = {
                id: d.order_id, 
                title: ` Order: ${d.order_id} (${d.product.name})`,
                start: d.rent_end, 
                content: `
                ${d.variant ? '<b>Variant: </b>' + d.variant + '<br>' : ''}
                <b>Qty: </b>${d.quantity}<br>
                <b>Return Date: </b>${calandarDateFormat(d.rent_end)}
                `,
                className: `m-fc-event--light m-fc-event--solid-primary`
            };
            this.eventList.push(obj);
        }
        
    }
  }

}
