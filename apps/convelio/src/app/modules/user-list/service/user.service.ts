import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    //use then & use loading & dispatch
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
