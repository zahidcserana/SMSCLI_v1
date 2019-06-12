export class Content {
    id?: number;
    tag: string;
    type: string;
    status: number;
    contents: string;
    multi?: boolean;
    label: string;
}

export class PageContent {
    id?: number;
    name: string = '';
    slug: string = '';
    contents: string;
    meta_description: string = '';
    meta_keyword: string = '';
    status: number = 1;
  }

export class Menu {
    id?: number;
    label: string;
    content_type: string = '';
    status: number = 1;
    content_url: string;
    content_id: number;
    sequence_no: number;
    type: string;
}
