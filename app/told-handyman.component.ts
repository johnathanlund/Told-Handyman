import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageScroll } from 'ng2-page-scroll';

import { SwiperModule } from 'angular2-useful-swiper';

@Component ({
  moduleId: module.id,
  selector: 'my-handyman',
  templateUrl: 'told-handyman.component.html',
  styleUrls: [
    './styles/told-handyman.component.css',
    './styles/told-handyman-top_title.component.css',
    './styles/told-handyman-top_menu.component.css',
    './styles/told-handyman-top_gallery.component.css',
    './styles/told-handyman-mid_services.component.css',
    './styles/told-handyman-mid_about.component.css',
    './styles/told-handyman-mid_reviews.component.css',
    './styles/told-handyman-bottom_contact.component.css',
    './styles/told-handyman-bottom_footer.component.css',
  ]
})

// config: Object = {
//         pagination: '.swiper-pagination',
//         paginationClickable: true,
//         nextButton: '.swiper-button-next',
//         prevButton: '.swiper-button-prev',
//         spaceBetween: 30
// }
export class ToldHandymanComponent {
  config: Object = {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30,
          loop: true
  };
}
