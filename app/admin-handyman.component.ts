import { Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { DataService }  from './services/data.service';
// import { FileUploadComponent }  from './fileUpload.component';
// import { UploadService }  from './services/upload.service';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneComponent }  from './dropzone.component';

@Component({
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
    // myForm: FormGroup;
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

    url: string = 'http://localhost:8000/service';
    // maxSize: number = 5000000;
    public files: File[];
    public progress: number = 0;
    public submitStarted: boolean;
    @ViewChild('nameField') nameField: ElementRef;
    @ViewChild('fileInput') fileInput: ElementRef;

    name: string;
    onClear: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http,
        private dataService: DataService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private renderer: Renderer,
        private formBuilder: FormBuilder) { }

    // event fired when the user selects an image
    onFileSelect(event) {
        this.clear();
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    this.files.push(files[i]);
                } else if (!this.isImage(file)) {
                // this.toastr.error('Only images are allowed');
                console.log('Only images are allowed.');
            }
        }
    }
    // check if the image is actually an image by checking the mime type
    isImage(file: File): boolean {
        if (!file.type.match('image/*')) {
          // this.toastr.error('Only images are allowed');
          console.log('Only images are allowed.');
            return false;
        }
        return true;
    }
    // check if the form has files ready to be uploaded
    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }
    // clears the form
    clear() {
        this.files = [];
        this.onClear.emit();
    }
    // remove the image from the preview
    remove(index: number) {
        this.files.splice(index, 1);
        this.fileInput.nativeElement.value = '';
    }
    // check the image file size
    // validate(file: File): boolean {
    //     if (this.maxSize && file.size > this.maxSize) {
    //         this.toastr.error(this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxSize)),
    //             this.invalidFileSizeMessage.replace('{0}', file.name));
    //         return false;
    //     }
    //     return true;
    // }
    // format the size to display it in toastr in case the user uploaded a file bigger than 5MB
    // formatSize(bytes) {
    //     if (bytes === 0) {
    //         return '0 B';
    //     }
    //     let k = 1000,
    //         dm = 3,
    //         sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    //         i = Math.floor(Math.log(bytes) / Math.log(k));
    //
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    // }

    ngOnInit() {
        this.readServices();
        this.readServiceLists();
        this.files = [];

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
    // createService() {
    //     this.dataService.createService(this.addServiceForm.value).subscribe(
    //         res => {
    //             let newService = res.json();
    //             console.log("AdminHandymanComponent new service is: " + JSON.stringify(newService));
    //             this.services.push(newService);
    //             console.log('Create service successfull at Admin-Handyman.component');
    //             this.addServiceForm.reset();
    //         },
    //         error => console.log('Create error at Admin-handyman.component. error:  ' + error)
    //     );
    // }

    // submit the form to back end
    createService() {
      this.submitStarted = true;
      let xhr = new XMLHttpRequest();
      let formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        console.log('On Admin component, it shows this.files[i].name as: ' + this.files[i].name);
        formData.append('serviceImage', this.files[i], this.files[i].name);
      }
      xhr.upload.addEventListener('progress', (event: ProgressEvent) => {
        if (event.lengthComputable) {
          this.progress = Math.round((event.loaded * 100) / event.total);
        }
      }, false);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.progress = 0;
          // if (xhr.status === 201) {
          //   this.router.navigateByUrl('/user/forms');
          //   // this.toastr.success('Form submitted successfully');
          //   console.log('Service Form submitted successfully');
          // } else if (xhr.status !== 201) {
          //   // this.toastr.error('There was an error!');
          //   console.log('Service Form, there was an error!');
          // }
          this.clear();
        }
      };
      xhr.open('POST', this.url, true);
      formData.append('serviceName', this.addServiceForm.value.serviceName);
      formData.append('serviceDescription', this.addServiceForm.value.serviceDescription);
      console.log('Xhr shows the formData as: ' + formData.serviceName);
      // xhr.withCredentials = true;
      xhr.send(formData);
      console.log(xhr);
    }


    clearServiceForm() {
      this.addServiceForm.reset();
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
            error => console.log('Update service Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE SERVICE:  " + + JSON.stringify(this.service))
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
                error => console.log('Delete service Failed at Admin-Handyman.component. error: ' + error)
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

    clearServiceListForm() {
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
            error => console.log('Update service list Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE SERVICE:  " + + JSON.stringify(this.serviceList))
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
                error => console.log('Delete service list Failed at Admin-Handyman.component. error: ' + error)
            );
        }
    }


}
