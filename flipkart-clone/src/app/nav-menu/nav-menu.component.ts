import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../servicess/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private _authService: AuthService
  ) {

  }

  ngOnInit(): void {
    // this.isLoggedIn$ = false;
    this._authService.isLoggedIn.subscribe( res => {
      console.log(res, 'res');
      this.isLoggedIn = res;
    })
    this._authService.checkAuth('userdata');
  }

  logout() {
    document.cookie = "userdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this._authService.isLoggedIn.next(false);
  }
}
