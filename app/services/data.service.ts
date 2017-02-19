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
  private _adminUrl = 'http://localhost:8000/services'

  createService(service): Observable<any> {
    console.log("Create service successfull at data.service");
    return this.http.post('/service', JSON.stringify(service), this.options);
  }

  readServices(): Observable<any> {
    console.log("Starting to Read service successfull at data.service");
    return this.http.get(this._adminUrl).map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    // console.log('Read read please reeeeeaaaaaad.....');
  }

  updateService(service): Observable<any> {
    console.log("Update service successfull at data.service");
    return this.http.put('/service/${service._id}', JSON.stringify(service), this.options);
  }

  deleteService(service): Observable<any> {
    console.log("Delete service successfull at data.service");
    return this.http.delete('/service/${service._id}', this.options);
  }

}
