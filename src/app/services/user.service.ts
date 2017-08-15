﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User, Login} from '../models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    url:string = "http://localhost:90/VillaCarApi/"

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        //return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    validMail(mail:string){
      let objeto = {
        mail:mail
      }
      return this.http.post(this.url+"validMail.php", objeto).map((response:Response) => {
        return response;
      })
    }
    create(user: User) {
        return this.http.post(this.url+"register.php", user).map((response: Response) => {
          response;
        })
    }
    authenticate(login:Login) {
        return this.http.post(this.url+"login.php", login).map((response: Response) => {
          return response;
        })
    }

    update(user: User) {
        //return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        //return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
