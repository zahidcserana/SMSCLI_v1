import {Injectable} from '@angular/core';

declare let $: any;


@Injectable()
export class ImageService {

    constructor() {}

    /* image remove btn */
    showButtons() {
      $('.image-thumbnail').hover((e) => {
          e.preventDefault();
          $(e.target).find('.cancel-image').css('display', 'block');
          $(e.target).find('.feature-image').css('display', 'block');
          }, () => {
          $('.cancel-image').css('display', 'none');
          $('.feature-image').css('display', 'none');
      });
      $('.img-thumbnail').hover((e) => {
          e.preventDefault();
          $(e.target).next().css('display', 'block').next().css('display', 'block');
        });
    }

}
