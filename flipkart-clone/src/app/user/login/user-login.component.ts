import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
// import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  AbstractControl,
  // FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from 'src/app/servicess/user/user.service';
import { AuthService } from '../../servicess/auth.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html'
})

export class UserLoginComponent implements OnInit {

  public userModel: User;

  public formMessage?: String;
  public submitted: boolean;

  // isLoggedIn = new BehaviorSubject();

  //--------------//
  constructor(
    private userService: UserService,
    private router: Router,
    private _authService: AuthService
  ) {
    this.submitted = false;
    this.userModel = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.userModel)
      .subscribe(
        (success: any) => {
          console.log(success, 'success');
          if (success.status == 'success') {
            let jsonData = JSON.stringify(success.data);
            console.log(jsonData, 'jsonData');
            document.cookie = "userdata="+jsonData;

            this._authService.isLoggedIn.next(true);
            this.router.navigate(['/profile']);

            return;
          }
          let htmlMsg = '<div class="alert alert-danger" role="alert">'+ success.message +'</div>';
          this.formMessage = success.message != '' ? htmlMsg : 'Something went wrong, please try later';
          // this.formMessage = success.message;
        },
        error => {
          console.log(error);
      });
    // this.userService.getUser(this.userModel.email)
    // .subscribe(
    //   (success: any) => {
    //     console.log(success);
    //     document.cookie = "username=John Doe";
    //   },
    //   error => {
    //     console.log(error);
    // });
  }

}

interface User {
  email: string,
  password: string
}
