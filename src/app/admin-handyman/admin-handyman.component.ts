import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DataService }  from '../_services/data.service';
import { AuthService } from '../_guards/auth.service';
import { User } from '../_models/user';
import { Subscription }   from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { MyModalService } from '../_services/myModal.service';
const URL = 'http://localhost:5000/upload';



@Component ({
  moduleId: module.id,
  selector: 'my-admin',
  templateUrl: 'admin-handyman.component.html',
  styleUrls: [
    '../_styles/admin-handyman.component.css',
    '../_styles/admin-handyman-top_title.component.css',
    '../_styles/admin-handyman-admin_top_gallery.component.css',
    '../_styles/admin-handyman-admin_services.component.css',
    '../_styles/admin-handyman-admin_reviews.component.css',
    '../_styles/uploadImage.component.css',
  ],
  // directives: [ DropzoneComponent ]
})
export class AdminHandymanComponent implements OnInit, OnDestroy  {

  articles;
   user: User;
   message: String;
   subscription: Subscription;

   modalName: string = '';

  imageName: string = '';

  gallerys = [];
  galleryIsLoading = true;

  gallery = {};
  galleryIsEditing = false;

  addGalleryForm: FormGroup;
  galleryName = new FormControl('', Validators.required);
  galleryDescription = new FormControl('', Validators.required);

  services = [];
  isLoading = true;

  service = {};
  isEditing = false;

  addServiceForm: FormGroup;
  serviceName = new FormControl('', Validators.required);
  serviceDescription = new FormControl('', Validators.required);

  serviceLists = [];
  serviceListIsLoading = true;

  serviceList = {};
  serviceListIsEditing = false;

  addServiceListForm: FormGroup;
  serviceListName = new FormControl('', Validators.required);
  serviceListDescription = new FormControl('', Validators.required);

  reviews = [];
  reviewIsLoading = true;

  review = {};
  reviewIsEditing = false;

  addReviewForm: FormGroup;
  reviewAuthor = new FormControl('', Validators.required);
  reviewLocation = new FormControl('', Validators.required);
  reviewMessage = new FormControl('', Validators.required);

   public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(public http: Http,
              public router: Router,
              public dataService: DataService,
              public authService: AuthService,
              public modalService: MyModalService,
              public config: AppConfig,
              public formBuilder: FormBuilder) {
                this.articles = [];

                 this.subscription = authService.user$.subscribe( (user) => this.user = user )
              }

  @ViewChild('myModal') el:ElementRef;

  ngAfterViewInit(){
    // this.modalName = document.getElementById('myModal');
    console.log('FROM NGAFTERVIEWINIT SHOWS: ' + document.getElementById('myModal'));
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
   //example of verification
   this.authService.verify().subscribe( (res) => this.message = res['message']);

// var imageName = '';
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false;
        file.file.name = file.file.name + '-' + Date.now();
        this.imageName = file.file.name;
        console.log('Within ngOnInit, imageName now is equal to: ' + this.imageName);
      };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload in QUEUE SHOWS: " + this.uploader.queue[0]);
            console.log("ImageUpload:uploaded:", item, " Thats the item. ", status, " Thats the status. ", response, " THats the response.", item.file.name );
            this.uploader.queue.length = 0;
            // this.uploader.queue[0].remove();
            console.log('What is in the uploader.queue is: ' + this.uploader.queue.length);
        };

    this.readGallerys();
    this.readServices();
    this.readServiceLists();
    this.readReviews();

    this.addGalleryForm = this.formBuilder.group({
      galleryName: this.galleryName,
      galleryDescription: this.galleryDescription,
      galleryImage: this.imageName
    });
    this.addServiceForm = this.formBuilder.group({
      serviceName: this.serviceName,
      serviceDescription: this.serviceDescription,
      serviceImage: this.imageName
    });
    this.addServiceListForm = this.formBuilder.group({
      serviceListName: this.serviceListName,
      serviceListDescription: this.serviceListDescription
    });
    this.addReviewForm = this.formBuilder.group({
      reviewAuthor: this.reviewAuthor,
      reviewLocation: this.reviewLocation,
      reviewMessage: this.reviewMessage,
      reviewImage: this.imageName
    });
  }

  ngOnDestroy() {
  // prevent memory leak when component destroyed
  this.subscription.unsubscribe();
}

logout() {
  this.authService.logout();
  this.user = null;
  this.message = "Logged out";
  this.router.navigate(['AdminHandyman']);
}

  //=====================Gallery Data Connections==================================
    createGallery() {
      this.addGalleryForm.value.galleryImage = this.imageName;
      this.dataService.createGallery(this.addGalleryForm.value).subscribe(
        res => {
          let newGallery = res.json();
          this.gallerys.push(newGallery);
          console.log('CREATE GALLERY IS SHOWING GETELEMENT AS: ' + document.getElementById('myModal'));
          console.log('CREATE GALLERY IS SHOWING GETELEMENT AS: ' + JSON.stringify(document.getElementById('myModal')));
          console.log('Create gallery successfull at Admin-Handyman.component');
          this.addGalleryForm.reset();
          // this.modalService.close(document.getElementById('myModal'));
          this.readGallerys();
        },
        error => console.log('Create gallery error at Admin-handyman.component. error:  ' + error)
      );
    }

    clearGalleryForm() {
      this.addGalleryForm.reset();
      this.cancelUploaderAll();
    }

    readGallerys() {
      this.dataService.readGallerys().subscribe(
        data => this.gallerys = data,
        error => console.log(error),
        () => this.galleryIsLoading = false
      );
    }

    enableGalleryEditing(gallery) {
      this.galleryIsEditing = true;
      this.gallery = gallery;
    }

    cancelGalleryEditing() {
      this.galleryIsEditing = false;
      this.gallery = {};
      this.readGallerys();
    }

    updateGallery(gallery) {
      if (this.imageName.length > 0) {
        gallery.galleryImage = this.imageName;
        console.log("Gallery Update in Admin, galleryImage is: " + gallery.galleryImage);
      }
      console.log("Past the Gallery Update If statement.");
      this.dataService.updateGallery(gallery).subscribe(
        res => {
          this.galleryIsEditing = false;
          this.gallery = gallery;
          console.log('Update gallery successfull at Admin-Handyman.component, gallery:  ' + JSON.stringify(this.gallery));
          this.readGallerys();
        },
        error => console.log('Update gallery Failed at Admin-Handyman.component. error: '+ error + "THIS IS THE Gallery:  " + + JSON.stringify(this.gallery))
      );
    }

    deleteGallery(gallery) {
      if (window.confirm('Are you sure you want to permanently delete this gallery?')) {
        this.dataService.deleteGallery(gallery).subscribe(
          res => {
            console.log('Delete gallery successfull at Admin-Handyman.component.');
            let pos = this.gallerys.map(elem => { return elem._id; }).indexOf(gallery._id);
            // this.gallerys.splice(pos, 1);
            this.readGallerys();
          },
          error => console.log('Delete gallery Failed at Admin-Handyman.component. error: '+ error)
        );
      }
    }

//=====================Service Data Connections==================================
  createService() {
    this.addServiceForm.value.serviceImage = this.imageName;
    this.dataService.createService(this.addServiceForm.value).subscribe(
      res => {
        let newService = res.json();
        this.services.push(newService);
        console.log('Create service successfull at Admin-Handyman.component');
        this.addServiceForm.reset();
        this.readServices();
      },
      error => console.log('Create error at Admin-handyman.component. error:  ' + error)
    );
  }

  readServices() {
    this.dataService.readServices().subscribe(
      data => this.services = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(service) {
    this.isEditing = true;
    this.service = service;
  }

  cancelEditing() {
    this.isEditing = false;
    this.service = {};
    this.readServices();
  }

  updateService(service) {
    if (this.imageName.length > 0) {
      service.serviceImage = this.imageName;
    }
    this.dataService.updateService(service).subscribe(
      res => {
        this.isEditing = false;
        this.service = service;
        console.log('Update service successfull at Admin-Handyman.component, service:  ' + JSON.stringify(this.service));
        this.readServices();
      },
      error => console.log('Update service Failed at Admin-Handyman.component. error: '+ error + "THIS IS THE SERVICE:  " + + JSON.stringify(this.service))
    );
  }

  deleteService(service) {
    if (window.confirm('Are you sure you want to permanently delete this service?')) {
      this.dataService.deleteService(service).subscribe(
        res => {
          console.log('Delete service successfull at Admin-Handyman.component.');
          let pos = this.services.map(elem => { return elem._id; }).indexOf(service._id);
          this.services.splice(pos, 1);
          this.readServices();
        },
        error => console.log('Delete service Failed at Admin-Handyman.component. error: '+ error)
      );
    }
  }

//==========================Service List Data Connections========================
createServiceList() {
  this.dataService.createServiceList(this.addServiceListForm.value).subscribe(
    res => {
      let newServiceList = res.json();
      console.log("AdminHandymanComponent new service list is: " + JSON.stringify(newServiceList));
      this.serviceLists.push(newServiceList);
      console.log('Create service list successfull at Admin-Handyman.component');
      this.readServiceLists();
    },
    error => console.log('Create error at service list in Admin-handyman.component. error:  ' + error)
  );
  // readServiceLists();
  this.addServiceListForm.reset();
}

readServiceLists() {
  this.dataService.readServiceLists().subscribe(
    // data => {
    //   console.log('Read services succesfull at Admin-Handyman.component');
    //   this.services = data;
    // },
    data => this.serviceLists = data,
    error => console.log(error),
    () => this.serviceListIsLoading = false
  );
}

enableServiceListEditing(serviceList) {
  this.serviceListIsEditing = true;
  this.serviceList = serviceList;
}

cancelServiceListEditing() {
  this.serviceListIsEditing = false;
  this.serviceList = {};
  this.readServiceLists();
}

updateServiceList(serviceList) {
  this.dataService.updateServiceList(serviceList).subscribe(
    res => {
      this.serviceListIsEditing = false;
      this.serviceList = serviceList;
      console.log('Update service list successfull at Admin-Handyman.component, service:  ' + JSON.stringify(this.serviceList));
      this.readServiceLists();
    },
    error => console.log('Update service list Failed at Admin-Handyman.component. error: '+ error + "THIS IS THE SERVICE:  " + + JSON.stringify(this.serviceList))
  );
}

deleteServiceList(serviceList) {
  if (window.confirm('Are you sure you want to permanently delete this service list item?')) {
    this.dataService.deleteServiceList(serviceList).subscribe(
      res => {
        console.log('Delete service list successfull at Admin-Handyman.component.');
        let pos = this.serviceLists.map(elem => { return elem._id; }).indexOf(serviceList._id);
        this.serviceLists.splice(pos, 1);
        this.readServiceLists();
      },
      error => console.log('Delete service list Failed at Admin-Handyman.component. error: '+ error)
    );
  }
}

//=====================Review Data Connections==================================
  createReview() {
    this.addReviewForm.value.reviewImage = this.imageName;
    this.dataService.createReview(this.addReviewForm.value).subscribe(
      res => {
        let newReview = res.json();
        this.reviews.push(newReview);
        console.log('Create review successfull at Admin-Handyman.component');
        this.addReviewForm.reset();
        this.readReviews();
      },
      error => console.log('Create review error at Admin-handyman.component. error:  ' + error)
    );
  }

  readReviews() {
    this.dataService.readReviews().subscribe(
      data => this.reviews = data,
      error => console.log(error),
      () => this.reviewIsLoading = false
    );
  }

  enableReviewEditing(review) {
    this.reviewIsEditing = true;
    this.review = review;
  }

  cancelReviewEditing() {
    this.reviewIsEditing = false;
    this.review = {};
    this.readReviews();
  }

  updateReview(review) {
    if (this.imageName.length > 0) {
      review.reviewImage = this.imageName;
    }
    this.dataService.updateReview(review).subscribe(
      res => {
        this.reviewIsEditing = false;
        this.review = review;
        console.log('Update review successfull at Admin-Handyman.component, review:  ' + JSON.stringify(this.review));
        this.readReviews();
      },
      error => console.log('Update review Failed at Admin-Handyman.component. error: '+ error + "THIS IS THE REVIEW:  " + + JSON.stringify(this.review))
    );
  }

  deleteReview(review) {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      this.dataService.deleteReview(review).subscribe(
        res => {
          console.log('Delete review successfull at Admin-Handyman.component.');
          let pos = this.reviews.map(elem => { return elem._id; }).indexOf(review._id);
          this.reviews.splice(pos, 1);
          this.readReviews();
        },
        error => console.log('Delete review Failed at Admin-Handyman.component. error: '+ error)
      );
    }
  }

//=================FileUploader Functions========================================
cancelUploaderItem(item) {
  for(var i = 0; i<this.uploader.queue.length; i++) {
   var itm = this.uploader.queue[i];
   if(itm=item) {
     itm.remove();
   }
  }
  console.log('File has been cleared from the uploader.queue');
};
cancelUploaderAll() {
  this.uploader.clearQueue();
  console.log("Uploader.queue has been cleared.");
}


 }
