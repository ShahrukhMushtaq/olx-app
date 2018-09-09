import { AdsService } from '../../services/ads.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  adds: any;

  constructor(private ads: AdsService, private router: Router) { }

  ngOnInit() {
    this.ads.getUserAds().subscribe(res => {
      this.adds = res;
      // console.log(this.adds);
    });
  }

  deleteAd(id) {
    // console.log(id);
    this.ads.deleteAd(id).subscribe(res => {
      if (res) {
        // this.adds = this.adds.filter(item => item.id !== id);
        this.adds = this.ads.getUserAds().subscribe(res => {
          this.adds = res;
        });
      }
    });
  }

}
