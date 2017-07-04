import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(mail: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ mail: mail, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    authenticated(){
      if (localStorage.getItem('currentUser')) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      return false;
    }
    public getRole(){
      if (localStorage.getItem('currentUser'))
      {
        let role = localStorage.getItem('currentUser');
         return JSON.parse(role).rol;
      }
    }
    public getProfile(){
      if(this.authenticated()){
        return  JSON.parse(localStorage.getItem('currentUser'));
      }else{
        return {};
      }
    }
}
