import { Component, OnInit } from '@angular/core';
import { DataService }  from './services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: `login.component.html`,
  styleUrls: ['./styles/login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  loginEmail = new FormControl('', Validators.required);
  loginPassword = new FormControl('', Validators.required);

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private router: Router){ }

ngOnInit() {
  this.loginUserForm = this.formBuilder.group({
    loginEmail: this.loginEmail,
    loginPassword: this.loginPassword
  });
}

 login() {
   this.dataService.login(this.loginUserForm.value).subscribe(
     res=> {
       let newLoginUser = res.json();
       console.log('Login successfull at AdminHandymanComponent');
       this.router.navigate(['/RealAdminHandyman']);
       console.log('Past the login.router in AdminHandymanComponent.');
       this.loginUserForm.reset();
     },
     error => console.log('Login error at AdminHandymanComponent')
   );

    // DataService.login($scope.credentials).then(function(response) {
      // $state.go('profile');
    // });
  }

  // $scope.register = function() {
  //   loginService.register($scope.newUser).then(function(response) {
  //     console.log(response.data);
  //     $state.go('login');
  //   });
  // };

}
