import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../servicess/user/user.service';

@Component({
  selector: 'user-register',
  templateUrl: '../register/user-register.component.html'
})

export class UserRegisterComponent implements OnInit {

  public userModel: User = new User;

  public formMessage?: String;
  public submitted: boolean;
  // form: FormGroup = new FormGroup({
  //   title: new FormControl(''),
  //   description: new FormControl('')
  // });

  constructor(private userService: UserService) {
    this.submitted = false
  }

  ngOnInit(): void {
  }
  submitRegistration() {
    console.log(this.userModel, 'this.userModel');
    this.userService.create(this.userModel)
      .subscribe(
        (success: any) => {
          console.log(success);
          if (success.status != 'success') {
            let htmlMsg = '<div class="alert alert-danger" role="alert">'+ success.message +'</div>';
            this.formMessage = success.message != '' ? htmlMsg : 'Something went wrong, please try later';
            return;
          }
          let htmlMsg = '<div class="alert alert-success" role="alert">'+ success.message +'</div>';
          this.formMessage = success.message != '' ? htmlMsg : 'Something went wrong, please try later';
          this.userModel = {
            email: "",
            first_name: "",
            last_name: "",
            password: ""
          };
          this.submitted = true;
        },
        error => {
          console.log(error);
      });
  }

  // showFormControls(form: any) {
  //   return form && form.controls.name &&
  //   form.controls.name.value; // Dr. IQ
  // }
}


// interface User {
//   first_name: string,
//   last_name: string,
//   email: string,
//   password: string
// }
