import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map, catchError } from 'rxjs/operators';


declare let $: any;

@Injectable()
export class HoursHolidaysService {

    constructor(
        private http: HttpService
    ) { }

    formatWeekDays(list?) {
        let newlist: WeekDays[] = []
        if (list && list.length > 0) {
            newlist = list.map(m => {
                m['weekName'] = weekDays.find(f => f.value === m.day).name;
                m.start_time = m.start_time ? m.start_time : '08:00';
                m.end_time = m.end_time ? m.end_time : '17:00';
                return m;
            });

        } else {
            for (const w of weekDays) {
                const week = new WeekDays();
                week.start_time = '08:00';
                week.end_time = '17:00';
                week.day = w.value;
                week.weekName = w.name;

                newlist.push(week);
            }
        }

        return newlist;
    }

    formatSubmitData(list: WeekDays[]) {
        const newArray: WeekDays[] = JSON.parse(JSON.stringify(list));
        newArray.forEach(e => {
            if (!e.is_open) {
                e.always_open = null;
                e.start_time = null;
                e.end_time = null;
            } else {
                if (e.always_open) {
                    e.start_time = null;
                    e.end_time = null;
                }
            }
            delete e.weekName;
        });
        return newArray;
    }

    datePicker() {
        $('#holiday-date-start').datepicker({
            todayHighlight: true,
            orientation: "bottom right",
            format: 'yyyy-mm-dd',
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            },
            startDate: new Date()
        });
        $('#holiday-date-end').datepicker({
            todayHighlight: true,
            orientation: "bottom right",
            format: 'yyyy-mm-dd',
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            },
            startDate: new Date()
        });
    }

    timePicker() {
        $('#holiday-time-start').timepicker({
            defaultTime: '12:00 AM', 
            minuteStep: 1,
            showSeconds: false,
            showMeridian: true,
            snapToStep: true
        });
        $('#holiday-time-end').timepicker({
            defaultTime: '11:59 PM', 
            minuteStep: 1,
            showSeconds: false,
            showMeridian: true,
            snapToStep: true
        });
    }

    getCurrentDateTime(date) {
       return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    getWeekDays() {
        return this.http.get('store-time').pipe(map(m => m.result.data), catchError(e => of([])));
    }

    saveWeekDays(data) {
        return this.http.post('store-time', data).toPromise();
    }

    getHolidaysList() {
        return this.http.get('holidays').pipe(map(m => m.result.data), catchError(e => of([])));
    }

    saveHolidays(data) {
        if(data.id) {
            return this.http.post(`holidays/${data.id}`, data).toPromise();
        }
        return this.http.post('holidays', data).toPromise();
    }

    deleteHoliday(id) {
        return this.http.delete(`holidays/${id}`).toPromise();
    }

}

export class Holiday {
    id?: number;
    start_date: string;
    end_date: string;
    description: string;
}

export class WeekDays {
    day: number;
    start_time: string;
    end_time: string;
    is_open: boolean = true;
    always_open: boolean = true;
    weekName?: string;
}

export const weekDays = [
    { value: 1, name: 'Monday' },
    { value: 2, name: 'Tuesday' },
    { value: 3, name: 'Wednesday' },
    { value: 4, name: 'Thursday' },
    { value: 5, name: 'Friday' },
    { value: 6, name: 'Saturday' },
    { value: 7, name: 'Sunday' },
]

export const hoursTime = [
    { value: "01:00", text: "01:00 am" },
    { value: "01:30", text: "01:30 am" },
    { value: "02:00", text: "02:00 am" },
    { value: "02:30", text: "02:30 am" },
    { value: "03:00", text: "03:00 am" },
    { value: "03:30", text: "03:30 am" },
    { value: "04:00", text: "04:00 am" },
    { value: "04:30", text: "04:30 am" },
    { value: "05:00", text: "05:00 am" },
    { value: "05:30", text: "05:30 am" },
    { value: "06:00", text: "06:00 am" },
    { value: "06:30", text: "06:30 am" },
    { value: "07:00", text: "07:00 am" },
    { value: "07:30", text: "07:30 am" },
    { value: "08:00", text: "08:00 am" },
    { value: "08:30", text: "08:30 am" },
    { value: "09:00", text: "09:00 am" },
    { value: "09:30", text: "09:30 am" },
    { value: "10:00", text: "10:00 am" },
    { value: "10:30", text: "10:30 am" },
    { value: "11:00", text: "11:00 am" },
    { value: "11:30", text: "11:30 am" },
    { value: "12:00", text: "12:00 pm" },
    { value: "12:30", text: "12:30 pm" },
    { value: "13:00", text: "01:00 pm" },
    { value: "13:30", text: "01:30 pm" },
    { value: "14:00", text: "02:00 pm" },
    { value: "14:30", text: "02:30 pm" },
    { value: "15:00", text: "03:00 pm" },
    { value: "15:30", text: "03:30 pm" },
    { value: "16:00", text: "04:00 pm" },
    { value: "16:30", text: "04:30 pm" },
    { value: "17:00", text: "05:00 pm" },
    { value: "17:30", text: "05:30 pm" },
    { value: "18:00", text: "06:00 pm" },
    { value: "18:30", text: "06:30 pm" },
    { value: "19:00", text: "07:00 pm" },
    { value: "19:30", text: "07:30 pm" },
    { value: "20:00", text: "08:00 pm" },
    { value: "20:30", text: "08:30 pm" },
    { value: "21:00", text: "09:00 pm" },
    { value: "21:30", text: "09:30 pm" },
    { value: "22:00", text: "10:00 pm" },
    { value: "22:30", text: "10:30 pm" },
    { value: "23:00", text: "11:00 pm" },
    { value: "23:30", text: "11:30 pm" },
    { value: "00:00", text: "12:00 am" },
    { value: "00:30", text: "12:30 am" }
];
