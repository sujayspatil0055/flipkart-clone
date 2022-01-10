import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {

  isLoggedIn = new Subject<boolean>();

  constructor(

  ) {

  }

  ngOnInit(): void {
    // this.getCookie('userdata');
  }

  checkAuth(cname: string) {
    console.log(cname, 'cname');
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log(c.indexOf(name) == 0, 'c.indexOf(name) == 0');

        this.isLoggedIn.next(true);
        return;
        // return c.substring(name.length, c.length);
      }
    }
    this.isLoggedIn.next(false);
    return;
    // return "";
  }

  getCookie(cname:string) {
    console.log(cname, 'cname');
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
