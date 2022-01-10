import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../servicess/user/user.service';

@Component({
  selector: 'user-listing',
  templateUrl: './user-listing.component.html'
})

export class UserListingComponent implements OnInit {

  public users?: User[];

  constructor(private userService: UserService) {
    // this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    // this.users = [
    //   { _id: '1', first_name: 'sujay', last_name: 'patil', email: 'sujay.p@ergobite.com' }
    // ];
    this.userService.getAllUser()
      .subscribe(
        (success: any) => {
          console.log(success.data1);
          console.log('data');
          this.users = success.data1;
          console.log(this.users, 'this.users');

      },
        error => {
          console.log(error);
      });
  }
}

// interface User {
//   _id: any,
//   first_name: string,
//   last_name: string,
//   email: string
// }
