import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-public-ad',
  templateUrl: './public-ad.component.html',
  styleUrls: ['./public-ad.component.css']
})
export class PublicAdComponent implements OnInit {
  adds: any;

  constructor(private ads: AdsService, private auth: AuthService) { }

  mark(ad){
    localStorage.setItem('Favorite',ad);
    console.log(localStorage.getItem('Favorite'));
  }

  ngOnInit() {
    this.ads.getAds().subscribe(res => {
      this.adds = res;
      // console.log(this.adds)   
    });
  }

}
