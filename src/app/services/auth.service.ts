import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  getUser(id){
    return this.http.get("https://olx-back.herokuapp.com/user/"+ id);
    // return this.http.get("http://localhost:3000/user/"+ id);
    
  }

  signup(data) {
    return this.http.post("https://olx-back.herokuapp.com/api/signup/add-user", data, this.httpOptions)
    // return this.http.post("http://localhost:3000/api/signup/add-user", data, this.httpOptions)
      .pipe(map(res => {
        if (res) {
          return true;
        }
        return false;
      }));
  }

  login(data) {
    return this.http.post("https://olx-back.herokuapp.com/api/login", data, this.httpOptions)
    // return this.http.post("http://localhost:3000/api/login", data, this.httpOptions)  
    .pipe(map(res => {
        if (res && res.hasOwnProperty('token')) {
          let token = res['token'];
          localStorage.setItem('token', token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwt = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let expiredDate = jwt.getTokenExpirationDate(token);
    let isExpired = jwt.isTokenExpired(token);

    return isExpired;
  }

  get CurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    let jwt = new JwtHelperService();
    return jwt.decodeToken(token);
  }
}
