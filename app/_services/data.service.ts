import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { AppConfig } from '../app.config';
import { Observable } from 'rxjs/Rx';
// Does this line below work without angular-cli?
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private config: AppConfig) { }

  //=============User Login Connections==========================================
  // login(user): Observable<any> {
  //   console.log("Login successfull at data.service");
  //   return this.http.post('http://localhost:8000/login', JSON.stringify(user), this.options);
  //   return this.http.post('http://localhost:8000/getCurrentUser', JSON.stringify(user), this.options)
  //   .map((res:Response) => res.json());
  // }

  //=============Contact Form Connections========================================

  createContactForm(contact): Observable<any> {
    console.log("Create contact form successfull at data.service");
    return this.http.post(this.config.apiUrl + '/contactForm', JSON.stringify(contact), this.options);
  }

  //=============Gallery Connections=============================================

  createGallery(gallery): Observable<any> {
    console.log("Create gallery successfull at data.service");
    return this.http.post(this.config.apiUrl + '/gallery', JSON.stringify(gallery), this.options);
  }

  readGallerys(): Observable<any> {
    console.log("Starting to Read gallery successfull at data.service");
    return this.http.get(this.config.apiUrl + '/gallerys').timeout(2000).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  updateGallery(gallery): Observable<any> {
    console.log("Update gallery successfull at data.service");
    return this.http.put(this.config.apiUrl + '/gallery/' + gallery._id, JSON.stringify(gallery), this.options);
  }

  deleteGallery(gallery): Observable<any> {
    console.log("Delete gallery successfull at data.service");
    return this.http.delete(this.config.apiUrl + '/gallery/' + gallery._id, this.options);
  }

  //=============Service Connections=============================================

  createService(service): Observable<any> {
    console.log("Create service successfull at data.service");
    return this.http.post(this.config.apiUrl + '/service', JSON.stringify(service), this.options);
  }

  readServices(): Observable<any> {
    console.log("Starting to Read service successfull at data.service");
    return this.http.get(this.config.apiUrl + '/services').timeout(2000).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    // console.log('Read read please reeeeeaaaaaad.....');
  }

  updateService(service): Observable<any> {
    console.log("Update service successfull at data.service");
    return this.http.put(this.config.apiUrl + '/service/' + service._id, JSON.stringify(service), this.options);
  }

  deleteService(service): Observable<any> {
    console.log("Delete service successfull at data.service");
    return this.http.delete(this.config.apiUrl + '/service/' + service._id, this.options);
  }

  //==============Service List Connections=======================================

  createServiceList(serviceList): Observable<any> {
    console.log("Create service list successfull at data.service");
    return this.http.post(this.config.apiUrl + '/serviceList', JSON.stringify(serviceList), this.options);
  }

  readServiceLists(): Observable<any> {
    console.log("Starting to Read service list successfull at data.service");
    return this.http.get(this.config.apiUrl + '/serviceLists').map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    // console.log('Read read please reeeeeaaaaaad.....');
  }

  updateServiceList(serviceList): Observable<any> {
    console.log("Update service list successfull at data.service");
    return this.http.put(this.config.apiUrl + '/serviceList/' + serviceList._id, JSON.stringify(serviceList), this.options);
  }

  deleteServiceList(serviceList): Observable<any> {
    console.log("Delete service list successfull at data.service");
    return this.http.delete(this.config.apiUrl + '/serviceList/' + serviceList._id, this.options);
  }

  //=============Review Connections=============================================

  createReview(review): Observable<any> {
    console.log("Create review successfull at data.service");
    return this.http.post(this.config.apiUrl + '/review', JSON.stringify(review), this.options);
  }

  readReviews(): Observable<any> {
    console.log("Starting to Read review successfull at data.service");
    return this.http.get(this.config.apiUrl + '/reviews').timeout(2000).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    // console.log('Read read please reeeeeaaaaaad.....');
  }

  updateReview(review): Observable<any> {
    console.log("Update review successfull at data.service");
    return this.http.put(this.config.apiUrl + '/review/' + review._id, JSON.stringify(review), this.options);
  }

  deleteReview(review): Observable<any> {
    console.log("Delete review successfull at data.service");
    return this.http.delete(this.config.apiUrl + '/review/' + review._id, this.options);
  }

}
