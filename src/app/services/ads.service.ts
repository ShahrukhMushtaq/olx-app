import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './auth.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  adDetail(id){
    return this.http.get("https://olx-back.herokuapp.com/api/submit-ad/fulladd/" + id);
    // return this.http.get("http://localhost:3000/api/submit-ad/fulladd/" + id);
  }

  getAds() {
    return this.http.get("https://olx-back.herokuapp.com/api/submit-ad");
    // return this.http.get("http://localhost:3000/api/submit-ad");
  }
  getUserAds() {
    return this.http.get("https://olx-back.herokuapp.com/api/submit-ad/ad/" + this.auth.CurrentUser._id._id);
    // return this.http.get("http://localhost:3000/api/submit-ad/ad/" + this.auth.CurrentUser._id._id);
  }

  postAd(data) {
    return this.http.post("https://olx-back.herokuapp.com/api/submit-ad/post", data)
    // return this.http.post("http://localhost:3000/api/submit-ad/post", data)
      .pipe(map(res => {
        if (res) {
          return true;
        }
        return false;
      }));
  }

  deleteAd(id) {
    return this.http.delete("https://olx-back.herokuapp.com/api/submit-ad/delete/" + id)
    // return this.http.delete("http://localhost:3000/api/submit-ad/delete/" + id)
      .pipe(map(res => {
        if (res) {
          return true;
        }
        return false;
      }));
  }

  searchAd(data: FormData) {
    return this.http.post("https://olx-back.herokuapp.com/api/search-ad", data)
    // return this.http.post("http://localhost:3000/api/search-ad", data)
      .pipe(map(res => {
        if (res) {
          return res;
        }
        return false;
      }));
  }
}
