import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.signupForm = fb.group({
      'username': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  onSubmit(form) {
    console.log(form);
    this.auth.signup(form.value)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['login']);
          console.log("Signup successfully");
        }
      });
  }

  ngOnInit() {
  }

}
