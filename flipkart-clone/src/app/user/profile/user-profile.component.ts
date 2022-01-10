import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../servicess/user/user.service';
import { AuthService } from '../../servicess/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public userModel: User = new User;
  public userData: any;
  constructor(private userService: UserService, private _authService: AuthService) {
    this.userData =  JSON.parse( this._authService.getCookie('userdata') );
  }

  ngOnInit(): void {
  }

  updateDetails() {
    this.userService.update(this.userData._id, this.userModel)
      .subscribe(
        (success: any) => {
          console.log(success);
        },
        error => {
          console.log(error);
      });
  }
}
