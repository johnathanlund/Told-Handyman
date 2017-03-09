import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScroll } from 'ng2-page-scroll';
import { ModalModule } from 'ng2-modal';
import { SwiperModule } from 'angular2-useful-swiper';

import { Http } from '@angular/http';
import { DataService }  from './services/data.service';

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

export class ToldHandymanComponent implements OnInit {
// export class ToldHandymanComponent {
  config: Object = {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30,
          loop: true,
          // This adds autoplay option to the gallery
          autoplay: 2500,
          autoplayDisableOnInteraction: false
  };

  gallerys = [];
  galleryIsLoading = true;

  gallery = {};
  galleryIsEditing = false;

  services = [];
  isLoading = true;

  service = {};
  isEditing = false;

  serviceLists = [];
  isLoadingList = true;

  serviceList = {};
  isEditingList = false;

  constructor(private http: Http,
              private dataService: DataService){ }

  ngOnInit() {
    this.readGallerys();
    this.readServices();
    this.readServiceLists();
  }

  readGallerys() {
    this.dataService.readGallerys().subscribe(
      data => this.gallerys = data,
      error => console.log(error),
      () => this.galleryIsLoading = false
    );
  }
  readServices() {
    this.dataService.readServices().subscribe(
      data => this.services = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  readServiceLists() {
    this.dataService.readServiceLists().subscribe(
      data => this.serviceLists = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
