import {Injectable} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';



@Injectable()
export class MetaService {
    constructor(private meta: Meta, private title: Title) {}

    updateTags(data) {
        // console.log(data);
        for (let d of data) {
            this.meta.updateTag(d);
        }
    }

    setTitle(name) {
        this.title.setTitle(name);
    }


}

