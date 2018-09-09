import { AuthService } from '../../services/auth.service';
import { AdsService } from '../../services/ads.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-ad',
  templateUrl: './search-ad.component.html',
  styleUrls: ['./search-ad.component.css']
})
export class SearchAdComponent implements OnInit {

  searchForm: FormGroup;
  searchAds: any;

  constructor(private fb: FormBuilder, private ads: AdsService, private auth: AuthService) {
    this.searchForm = fb.group({
      'category': ["", Validators.required]
    });
  }


  onSubmit(form) {
    console.log(form);
    this.ads.searchAd(form).subscribe(res => {
      console.log(res);
      this.searchAds = res;
    })
  }

  ngOnInit() {
  }

}
