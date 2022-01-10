import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user/register/user-register.component';
import { UserLoginComponent } from './user/login/user-login.component';
import { UserListingComponent } from './user/listing/user-listing.component';
import { UserProfileComponent } from './user/profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterMenuComponent,
    HomeComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserListingComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'listing', component: UserListingComponent },
      { path: 'profile', component: UserProfileComponent }
    ])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
