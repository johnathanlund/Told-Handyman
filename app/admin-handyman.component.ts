import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { DataService }  from './services/data.service';
// import { FileUploadComponent }  from './fileUpload.component';
// import { UploadService }  from './services/upload.service';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneComponent }  from './dropzone.component';

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
    './styles/dropzone.css',
  ],
  // directives: [ DropzoneComponent ]
})
export class AdminHandymanComponent implements OnInit {

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

  constructor(private http: Http,
              private dataService: DataService,
              // private uploadService: UploadService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.readServices();
    this.readServiceLists();

    this.addServiceForm = this.formBuilder.group({
      serviceName: this.serviceName,
      serviceDescription: this.serviceDescription
    });
    this.addServiceListForm = this.formBuilder.group({
      serviceListName: this.serviceListName,
      serviceListDescription: this.serviceListDescription
    });
  }

//=====================Service Data Connections==================================
  createService() {
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


 }
