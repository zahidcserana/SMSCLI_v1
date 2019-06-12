import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from '../models/settings.models';



export class TagCongif {
    reload?: Boolean;
    tag?: Tag;
    editMode?: boolean;
}

@Injectable()
export class TagService {
    private subject: TagCongif = { reload: false,  editMode: false};
    tagReload = new BehaviorSubject(this.subject);


}
