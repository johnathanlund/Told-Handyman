import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { DataService }  from './services/data.service';

@Component ({
  moduleId: module.id,
  selector: 'my-admin',
  templateUrl: 'admin-handyman.component.html',
  styleUrls: [
    './styles/admin-handyman.component.css',
    './styles/admin-handyman-top_title.component.css',
    './styles/admin-handyman-admin_top_gallery.component.css',
    './styles/admin-handyman-admin_services.component.css',
    './styles/admin-handyman-admin_reviews.component.css'
  ]
})
export class AdminHandymanComponent implements OnInit {

  services = [];
  isLoading = true;

  service = {};
  isEditing = false;

  addServiceForm: FormGroup;
  serviceName = new FormControl('', Validators.required);
  serviceDescription = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.readServices();

    this.addServiceForm = this.formBuilder.group({
      name: this.serviceName,
      desc: this.serviceDescription
    });
  }

  createService() {
    this.dataService.createService(this.addServiceForm.value).subscribe(
      res => {
        let newService = res.json();
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
        console.log('Update service successfull at Admin-Handyman.component');
        this.isEditing = false;
        this.service = service;
      },
      error => console.log('Update service Failed at Admin-Handyman.component. error: '+ error)
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

 }
