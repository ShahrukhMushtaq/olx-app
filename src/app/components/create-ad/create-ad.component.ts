import { AdsService } from '../../services/ads.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {
  adForm: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef

  constructor(private fb: FormBuilder, private router: Router, public auth: AuthService, private ads: AdsService) {
    this.createAd();
  }

  createAd() {
    this.adForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required],
      productImage: [null, Validators.required],
      model: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  onChange(ev) {
    if (ev.target.files.length > 0) {
      let file = ev.target.files[0];
      this.adForm.get('productImage').setValue(file);
    }
  }

  private gatheringData() {
    let id = this.auth.CurrentUser._id._id;
    let input = new FormData();
    input.append('title', this.adForm.get('title').value);
    input.append('description', this.adForm.get('description').value);
    input.append('category', this.adForm.get('category').value);
    input.append('productImage', this.adForm.get('productImage').value);
    input.append('model', this.adForm.get('model').value);
    input.append('price', this.adForm.get('price').value);
    input.append('userId', id);
    return input;
  }

  onSubmit() {
    const form = this.gatheringData();
    console.log(form);
    this.ads.postAd(form)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['']);
        }
        else { this.router.navigate(['create-ad']); }
      })
  }

  ngOnInit() {
    // console.log(this.auth.CurrentUser._id._id)
  }

}
