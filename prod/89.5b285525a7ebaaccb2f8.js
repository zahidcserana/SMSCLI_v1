(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{f3vu:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=function(){function l(){this.status="pickup"}return l.prototype.ngOnInit=function(){},l}(),a=function(){},r=u("ZYCi"),i=u("Ip0R"),d=u("gIcY"),s=u("EVdn"),o=(u("Io7t"),u("SYky"),u("BrZb")),c=u("apbQ"),p=u("9Z1F"),v=u("67Y/"),m=u("F/XL"),f=function(){function l(l,n){this.router=l,this.http=n,this.type="month",this.today="",this.eventList=[]}return l.prototype.ngOnChanges=function(){this.getRentelList()},l.prototype.ngAfterViewInit=function(){this.startCalender()},l.prototype.ngOnDestroy=function(){s("#m_calendar").fullCalendar("destroy")},l.prototype.startCalender=function(){var l=this;this.calendarBasic(),s(".fc-month-button").click(function(){l.changeMode()}),s(".fc-listWeek-button").click(function(){l.changeMode()}),s(".fc-prev-button").click(function(){l.changeMode()}),s(".fc-next-button").click(function(){l.changeMode()}),s(".fc-today-button").click(function(){l.changeMode()})},l.prototype.calendarBasic=function(){var l=this;s("#m_calendar").fullCalendar({header:{left:"prev,next today",center:"title",right:"month,listWeek,agendaDay"},navLinks:!0,timeFormat:"h:mm t",events:this.eventList,eventRender:function(n,u,e){l.addToolTip(u,n),u.addClass("cursor-pointer"),u.click(function(){l.navigate(n)})}})},l.prototype.addToolTip=function(l,n){l.popover({title:"pickup"===this.status?"Pickup":"Returned",content:n.content,html:!0,placement:"top",trigger:"hover",container:"body"}),l.click(function(){l.popover("hide")})},l.prototype.navigate=function(l){"pickup"===this.status&&[1,2,3,7].includes(l.status)?this.router.navigate(["/admin/reservations/"+l.id+"/details/edit/product"],{queryParams:{param:l.v_id}}):this.router.navigate(["/admin/reservations/"+l.id+"/details"])},l.prototype.changeMode=function(){this.today=s("#m_calendar").fullCalendar("getDate").format(),this.type=s("#m_calendar").fullCalendar("getView").type,this.getRentelList()},l.prototype.getRentelList=function(){var l=this,n=Object(c.D)(this.type,this.today);this.http.get("calendar/order?type="+this.status+"&start_date="+n.start_date+"&end_date="+n.end_date).pipe(Object(v.a)(function(l){return l.result.data}),Object(p.a)(function(l){return Object(m.a)([])})).subscribe(function(n){l.formatEvent(n),s("#m_calendar").fullCalendar("removeEvents"),s("#m_calendar").fullCalendar("addEventSource",l.eventList),s("#m_calendar").fullCalendar("rerenderEvents")})},l.prototype.formatEvent=function(l){this.eventList=[];for(var n=0,u=l;n<u.length;n++){var e=u[n];if("pickup"===this.status){var t={id:e.order_id,title:" Order Id: "+e.order_id+" ("+e.product.name+")",start:e.rent_start,end:e.rent_end?e.rent_end:e.rent_start,status:e.status,content:"\n                "+(e.variant?"<b>Variant: </b>"+e.variant+"<br>":"")+"\n                <b>Qty: </b>"+e.quantity+"</b><br>\n                <b>Start: </b>"+Object(c.n)(e.rent_start)+"<br> \n                <b>End: </b>"+Object(c.n)(e.rent_end?e.rent_end:e.rent_start)+"\n                ",v_id:e.variants_products_id,className:"m-fc-event--light m-fc-event--solid-brand"};this.eventList.push(t)}else t={id:e.order_id,title:" Order: "+e.order_id+" ("+e.product.name+")",start:e.rent_end,content:"\n                "+(e.variant?"<b>Variant: </b>"+e.variant+"<br>":"")+"\n                <b>Qty: </b>"+e.quantity+"<br>\n                <b>Return Date: </b>"+Object(c.n)(e.rent_end)+"\n                ",className:"m-fc-event--light m-fc-event--solid-primary"},this.eventList.push(t)}},l}(),_=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function h(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,0,"div",[["id","m_calendar"]],null,null,null,null,null))],null,null)}var g=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,28,"div",[["class","m-subheader"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,27,"div",[["class","d-flex align-items-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,26,"div",[["class","mr-auto"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,1,"h3",[["class","m-subheader__title m-subheader__title--separator"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Rental Calendar "])),(l()(),e["\u0275eld"](5,0,null,null,23,"ul",[["class","m-subheader__breadcrumbs m-nav m-nav--inline"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,3,"li",[["class","m-nav__item m-nav__item--home"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,2,"a",[["class","m-nav__link m-nav__link--icon"],["routerLink","/admin"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,8).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](8,671744,null,0,r.o,[r.m,r.a,i.i],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](9,0,null,null,0,"i",[["class","m-nav__link-icon la la-home"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"li",[["class","m-nav__separator"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,0,"i",[["class","fa fa-angle-right"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,3,"li",[["class","m-nav__item"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,2,"a",[["class","m-nav__link"]],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,1,"span",[["class","m-nav__link-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Reservations "])),(l()(),e["\u0275eld"](16,0,null,null,1,"li",[["class","m-nav__separator"],["style","padding-left: 10px"]],null,null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,0,"i",[["class","fa fa-angle-right"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,4,"li",[["class","m-nav__item"]],null,null,null,null,null)),(l()(),e["\u0275eld"](19,0,null,null,3,"a",[["class","m-nav__link"],["routerLink","/admin/reservations/all"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e["\u0275nov"](l,20).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},null,null)),e["\u0275did"](20,671744,null,0,r.o,[r.m,r.a,i.i],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](21,0,null,null,1,"span",[["class","m-nav__link-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Order List "])),(l()(),e["\u0275eld"](23,0,null,null,1,"li",[["class","m-nav__separator"],["style","padding-left: 10px"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,0,"i",[["class","fa fa-angle-right"]],null,null,null,null,null)),(l()(),e["\u0275eld"](25,0,null,null,3,"li",[["class","m-nav__item"]],null,null,null,null,null)),(l()(),e["\u0275eld"](26,0,null,null,2,"a",[["class","m-nav__link"]],null,null,null,null,null)),(l()(),e["\u0275eld"](27,0,null,null,1,"span",[["class","m-nav__link-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Rental Calendar "])),(l()(),e["\u0275eld"](29,0,null,null,31,"div",[["class","m-content animated fadeIn"]],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,30,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,29,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](32,0,null,null,28,"div",[["class","m-portlet"],["id","m_portlet"]],null,null,null,null,null)),(l()(),e["\u0275eld"](33,0,null,null,24,"div",[["class","m-portlet__head"]],null,null,null,null,null)),(l()(),e["\u0275eld"](34,0,null,null,5,"div",[["class","m-portlet__head-caption"]],null,null,null,null,null)),(l()(),e["\u0275eld"](35,0,null,null,4,"div",[["class","m-portlet__head-title"]],null,null,null,null,null)),(l()(),e["\u0275eld"](36,0,null,null,1,"span",[["class","m-portlet__head-icon"]],null,null,null,null,null)),(l()(),e["\u0275eld"](37,0,null,null,0,"i",[["class","flaticon-map-location"]],null,null,null,null,null)),(l()(),e["\u0275eld"](38,0,null,null,1,"h3",[["class","m-portlet__head-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Rental Calendar "])),(l()(),e["\u0275eld"](40,0,null,null,17,"div",[["class","m-portlet__head-tools"]],null,null,null,null,null)),(l()(),e["\u0275eld"](41,0,null,null,16,"ul",[["class","m-portlet__nav"]],null,null,null,null,null)),(l()(),e["\u0275eld"](42,0,null,null,15,"li",[["class","m-portlet__nav-item"]],null,null,null,null,null)),(l()(),e["\u0275eld"](43,0,null,null,14,"div",[["class","form-group mb-0"]],null,null,null,null,null)),(l()(),e["\u0275eld"](44,0,null,null,13,"select",[["class","form-control w-100"],["name","status"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,u){var t=!0,a=l.component;return"change"===n&&(t=!1!==e["\u0275nov"](l,45).onChange(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,45).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(a.status=u)&&t),t},null,null)),e["\u0275did"](45,16384,null,0,d.A,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,d.p,function(l){return[l]},[d.A]),e["\u0275did"](47,671744,null,0,d.u,[[8,null],[8,null],[8,null],[6,d.p]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,d.q,null,[d.u]),e["\u0275did"](49,16384,null,0,d.r,[[4,d.q]],null,null),(l()(),e["\u0275eld"](50,0,null,null,3,"option",[["value","pickup"]],null,null,null,null,null)),e["\u0275did"](51,147456,null,0,d.v,[e.ElementRef,e.Renderer2,[2,d.A]],{value:[0,"value"]},null),e["\u0275did"](52,147456,null,0,d.H,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Pickup"])),(l()(),e["\u0275eld"](54,0,null,null,3,"option",[["value","return"]],null,null,null,null,null)),e["\u0275did"](55,147456,null,0,d.v,[e.ElementRef,e.Renderer2,[2,d.A]],{value:[0,"value"]},null),e["\u0275did"](56,147456,null,0,d.H,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Returned"])),(l()(),e["\u0275eld"](58,0,null,null,2,"div",[["class","m-portlet__body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](59,0,null,null,1,"app-calander",[],null,null,null,h,_)),e["\u0275did"](60,4898816,null,0,f,[r.m,o.b],{status:[0,"status"]},null)],function(l,n){var u=n.component;l(n,8,0,"/admin"),l(n,20,0,"/admin/reservations/all"),l(n,47,0,"status",u.status),l(n,51,0,"pickup"),l(n,52,0,"pickup"),l(n,55,0,"return"),l(n,56,0,"return"),l(n,60,0,u.status)},function(l,n){l(n,7,0,e["\u0275nov"](n,8).target,e["\u0275nov"](n,8).href),l(n,19,0,e["\u0275nov"](n,20).target,e["\u0275nov"](n,20).href),l(n,44,0,e["\u0275nov"](n,49).ngClassUntouched,e["\u0275nov"](n,49).ngClassTouched,e["\u0275nov"](n,49).ngClassPristine,e["\u0275nov"](n,49).ngClassDirty,e["\u0275nov"](n,49).ngClassValid,e["\u0275nov"](n,49).ngClassInvalid,e["\u0275nov"](n,49).ngClassPending)})}var y=e["\u0275ccf"]("app-rental-calender",t,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-rental-calender",[],null,null,null,b,g)),e["\u0275did"](1,114688,null,0,t,[],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),k=function(){};u.d(n,"RentalCalenderModuleNgFactory",function(){return C});var C=e["\u0275cmf"](a,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[y]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,i.n,i.m,[e.LOCALE_ID,[2,i.x]]),e["\u0275mpd"](4608,d.F,d.F,[]),e["\u0275mpd"](1073742336,i.b,i.b,[]),e["\u0275mpd"](1073742336,k,k,[]),e["\u0275mpd"](1073742336,d.C,d.C,[]),e["\u0275mpd"](1073742336,d.l,d.l,[]),e["\u0275mpd"](1073742336,r.p,r.p,[[2,r.u],[2,r.m]]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](1024,r.k,function(){return[[{path:"",component:t}]]},[])])})}}]);