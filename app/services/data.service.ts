import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';

import { Observable } from 'rxjs/Rx';
// Does this line below work without angular-cli?
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }
  private _adminUrl = 'http://localhost:8000';

  //=============Gallery Connections=============================================

  createGallery(gallery): Observable<any> {
    console.log("Create gallery successfull at data.service");
    return this.http.post('http://localhost:8000/gallery', JSON.stringify(gallery), this.options);
  }

  readGallerys(): Observable<any> {
    console.log("Starting to Read gallery successfull at data.service");
    return this.http.get('http://localhost:8000/gallerys').timeout(2000).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  updateGallery(gallery): Observable<any> {
    console.log("Update gallery successfull at data.service");
    return this.http.put('http://localhost:8000/gallery/' + gallery._id, JSON.stringify(gallery), this.options);
  }

  deleteGallery(gallery): Observable<any> {
    console.log("Delete gallery successfull at data.service");
    return this.http.delete('http://localhost:8000/gallery/' + gallery._id, this.options);
  }

  //=============Service Connections=============================================

  createService(service): Observable<any> {
    console.log("Create service successfull at data.service");
    return this.http.post('http://localhost:8000/service', JSON.stringify(service), this.options);
  }

  readServices(): Observable<any> {
    console.log("Starting to Read service successfull at data.service");
    return this.http.get('http://localhost:8000/services').timeout(2000).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    // console.log('Read read please reeeeeaaaaaad.....');
  }

  updateService(service): Observable<any> {
    console.log("Update service successfull at data.service");
    return this.http.put('http://localhost:8000/service/' + service._id, JSON.stringify(service), this.options);
  }

  deleteService(service): Observable<any> {
    console.log("Delete service successfull at data.service");
    return this.http.delete('http://localhost:8000/service/' + service._id, this.options);
  }

  //==============Service List Connections=======================================

  createServiceList(serviceList): Observable<any> {
    console.log("Create service list successfull at data.service");
    return this.http.post('http://localhost:8000/serviceList', JSON.stringify(serviceList), this.options);
  }

  readServiceLists(): Observable<any> {
    console.log("Starting to Read service list successfull at data.service");
    return this.http.get('http://localhost:8000/serviceLists').map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    // console.log('Read read please reeeeeaaaaaad.....');
  }

  updateServiceList(serviceList): Observable<any> {
    console.log("Update service list successfull at data.service");
    return this.http.put('http://localhost:8000/serviceList/' + serviceList._id, JSON.stringify(serviceList), this.options);
  }

  deleteServiceList(serviceList): Observable<any> {
    console.log("Delete service list successfull at data.service");
    return this.http.delete('http://localhost:8000/serviceList/' + serviceList._id, this.options);
  }

}
