import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }     from 'rxjs/observable';
import { User } from '../_models/user';
import { AppConfig } from '../app.config';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService implements CanActivate {

  // private base_url = '${this.app_config}/api/user';
  // private base_url = 'http://www.toldhandyman.com/api/user';
  token: string;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  constructor(public http: Http, private router: Router, private config: AppConfig) { }

  setUser(user: User) {
    this.userSource.next(user);
  }

  registerUser(user: User): Observable<boolean> {
    let body = JSON.stringify(user);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.apiUrl + `/api/user/register`, body, options).map( (res) => this.setToken(res) );
  }

  loginUser(user): Observable<Object> {
    let body = JSON.stringify(user);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.apiUrl + `/api/user/login`, body, options).map( (res) => this.setToken(res) );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  verify(): Observable<Object> {

    let currUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.config.apiUrl + `/api/user/check-state`, options).map( res => this.parseRes(res) );

  }

  setToken(res){
    let body = JSON.parse(res['_body']);
    if( body['success'] == true ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({
        email: body['user']['email'],
        name: body['user']['name'],
        token: this.token
      }));
    }
    return body;
  }

  parseRes(res){
    let body = JSON.parse(res['_body']);
    return body;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/AdminHandyman'], { queryParams: { returnUrl: state.url }});
      console.log('User is not logged in. Routing back to login page.');
      return false;
  }

}
