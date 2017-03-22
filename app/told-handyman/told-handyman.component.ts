import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageScroll } from 'ng2-page-scroll';
import { ModalModule } from 'ng2-modal';
import { SwiperModule } from 'angular2-useful-swiper';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Http } from '@angular/http';
import { DataService }  from '../_services/data.service';
import { MyModalService } from '../_services/myModal.service';

@Component ({
  moduleId: module.id,
  selector: 'my-handyman',
  templateUrl: 'told-handyman.component.html',
  styleUrls: [
    '../_styles/told-handyman.component.css',
    '../_styles/told-handyman-top_title.component.css',
    '../_styles/told-handyman-top_menu.component.css',
    '../_styles/told-handyman-top_gallery.component.css',
    '../_styles/told-handyman-mid_services.component.css',
    '../_styles/told-handyman-mid_about.component.css',
    '../_styles/told-handyman-mid_reviews.component.css',
    '../_styles/told-handyman-bottom_contact.component.css',
    '../_styles/told-handyman-bottom_footer.component.css',
  ]
})

export class ToldHandymanComponent implements OnInit {
// export class ToldHandymanComponent {

addContactForm: FormGroup;
contactName = new FormControl('', Validators.required);
contactEmail = new FormControl('', Validators.required);
contactPhone1of3 = new FormControl('', Validators.required);
contactPhone2of3 = new FormControl('', Validators.required);
contactPhone3of3 = new FormControl('', Validators.required);
contactMessage = new FormControl('', Validators.required);

phoneCombined: string = '';

  config: Object = {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30,
          // loop: true,
          // This adds autoplay option to the gallery
          // autoplay: 4500,
          // autoplayDisableOnInteraction: false
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

  reviews = [];
  reviewIsLoading = true;

  review = {};
  reviewIsEditing = false;

  constructor(private http: Http,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private myModalService: MyModalService
            ){ }

  ngOnInit() {
    this.readGallerys();
    this.readServices();
    this.readServiceLists();
    this.readReviews();

    this.addContactForm = this.formBuilder.group({
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      contactPhone1of3: this.contactPhone1of3,
      contactPhone2of3: this.contactPhone2of3,
      contactPhone3of3: this.contactPhone3of3,
      // contactPhone: this.phoneCombined,
      // contactPhone1of3 + contactPhone2of3 + contactPhone3of3: this.contactPhone,
      contactMessage: this.contactMessage,
    });
    this.phoneCombined = this.addContactForm.value.contactPhone1of3;

  }

  //===============Contact Form Connections=====================================
  createContactForm() {
    // this.addContactForm.value.contactPhone = this.phoneCombined;
    // console.log(" PART 2 Create Contact Form shows contactPhone as: " + this.addContactForm.value.contactPhone);
    console.log("Create Contact Form shows contactPhone as: " + '(' + this.addContactForm.value.contactPhone1of3 + ')' + this.addContactForm.value.contactPhone2of3 + '-' + this.addContactForm.value.contactPhone3of3);
    // console.log("PART 3 Create Contact Form shows phoneCombined as: " + this.phoneCombined);
    this.dataService.createContactForm(this.addContactForm.value).subscribe(
      res => {
        let newContactForm = res.json();
        console.log("Create contact form successfull at AdminHandymanComponent.");
        this.addContactForm.reset();
      },
      error => console.log('Create contact form error at AdminHandymanComponent.')
    );
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
  readReviews() {
    this.dataService.readReviews().subscribe(
      // console.log("Reading Reviews from Told Handyman component."),
      data => this.reviews = data,
      error => console.log(error),
      () => this.reviewIsLoading = false
    );
  }

  openMyModal(id: string){
     this.myModalService.open(id);
 }

 closeMyModal(id: string){
     this.myModalService.close(id);
 }

}
