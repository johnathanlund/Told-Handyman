import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { AppConfig } from '../app.config';

import { Observable } from 'rxjs/Rx';
// Does this line below work without angular-cli?
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadService {

  private headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private config: AppConfig) { }
  // private _adminUrl = 'http://localhost:8000'

  upload(fileToUpload: any) {
      let input = new FormData();
      input.append("file", fileToUpload);

      return this.http
          .post(this.config.apiUrl + "/upload", input);
  }

}
