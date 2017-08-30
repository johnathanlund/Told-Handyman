import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_guards/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  message: String;
  user: User;
  user_status: boolean;

  constructor(public router: Router, public authService: AuthService) {
    this.user = new User;
  }

  loginUser(user){
    this.authService.loginUser(user).subscribe( res => {
      this.user_status = res['success'];
      if(res['success'] == true) {
        this.authService.setUser(res['user']);
        this.router.navigate(['login/AdminHandyman']);
      } else {
        this.message = res['message'];
      }
    });
  }

}
