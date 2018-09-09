import { AuthService } from '../../services/auth.service';
import { AdsService } from '../../services/ads.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  adDetail: any;
  user: any;
  constructor(private ads: AdsService, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(param => {
        var id = param.get('id');
        // console.log(id);
        this.ads.adDetail(id).subscribe(res => {
          // console.log(res);
          this.adDetail = res;
          this.adDetail = Array(this.adDetail);
          // console.log(this.adDetail[0].user)
          this.auth.getUser(this.adDetail[0].user).subscribe(res => {
            // console.log(res);
            this.user = res;
            this.user = Array(this.user)
          });
        });
      });
  }
}
