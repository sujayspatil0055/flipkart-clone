import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public apiEndpoint;


  constructor(private http:HttpClient) {
    this.apiEndpoint = 'http://localhost:3000';
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiEndpoint + '/user/all');
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiEndpoint + '/user/register', data);
  }

  login(data: any): Observable<User> {
    return this.http.post<User>(this.apiEndpoint + '/user/login', data);
  }

  getUser(email: string): Observable<User> {
    return this.http.get<User>(this.apiEndpoint + '/user/get_user_by_email/'+ email.trim());
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(this.apiEndpoint + '/user/update/'+id, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
