import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DataService }  from './services/data.service';
// import { FileUploadComponent }  from './fileUpload.component';
// import { UploadService }  from './services/upload.service';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneComponent }  from './dropzone.component';
const URL = 'http://localhost:8000/upload';
// var imageName = '';

@Component ({
  moduleId: module.id,
  selector: 'my-admin',
  templateUrl: 'admin-handyman.component.html',
  styleUrls: [
    './styles/admin-handyman.component.css',
    './styles/admin-handyman-top_title.component.css',
    './styles/admin-handyman-admin_top_gallery.component.css',
    './styles/admin-handyman-admin_services.component.css',
    './styles/admin-handyman-admin_reviews.component.css',
    './styles/uploadImage.component.css',
  ],
  // directives: [ DropzoneComponent ]
})
export class AdminHandymanComponent implements OnInit {

  imageName: string = '';

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

   public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private http: Http,
              private dataService: DataService,
              // private uploadService: UploadService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
// var imageName = '';
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false;
        console.log('In .onAfterAddingFile, jsonof file is:  ' + file.file.name);
        console.log('Json of file.file is: ' + JSON.stringify(file.file));
        this.imageName = file.file.name;
        console.log('Within ngOnInit, imageName now is equal to: ' + this.imageName);
      };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, " Thats the item. ", status, " Thats the status. ", response, " THats the response.", item.file.name );
            this.uploader.queue.length = 0;
            console.log('What is in the uploader.queue is: ' + this.uploader.queue.length);
        };

    this.readServices();
    this.readServiceLists();
    // console.log('NOW SAYING THAT imageName is: ' + this.imageName);
    this.addServiceForm = this.formBuilder.group({
      serviceName: this.serviceName,
      serviceDescription: this.serviceDescription,
      serviceImage: this.imageName
    });
    this.addServiceListForm = this.formBuilder.group({
      serviceListName: this.serviceListName,
      serviceListDescription: this.serviceListDescription
    });
  }

//=====================Service Data Connections==================================
  createService() {
    console.log('NOW THE VALUE of imageName is : ' + this.imageName);
    this.addServiceForm.value.serviceImage = this.imageName;
    console.log('NOW FOR addServiceForm value of serviceImage is : ' + this.addServiceForm.value.serviceImage);
    this.dataService.createService(this.addServiceForm.value).subscribe(
      res => {
        let newService = res.json();
        console.log("AdminHandymanComponent new service is: " + JSON.stringify(newService));
        this.services.push(newService);
        console.log('Create service successfull at Admin-Handyman.component');
        this.addServiceForm.reset();
      },
      error => console.log('Create error at Admin-handyman.component. error:  ' + error)
    );
  }

  readServices() {
    this.dataService.readServices().subscribe(
      // data => {
      //   console.log('Read services succesfull at Admin-Handyman.component');
      //   this.services = data;
      // },
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
      },
      error => console.log('Delete service list Failed at Admin-Handyman.component. error: '+ error)
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
