import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  private authStatusSub: Subscription;

  constructor(private formBuilder: FormBuilder, private authSvc: AuthService) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: '',
      password: '',
    });

    this.authStatusSub = this.authSvc
      .getAuthStatusListner()
      .subscribe(() => {});
  }

  onSignup() {
    const value = this.formGroup.value;
    const data: AuthData = {
      username: value.username,
      password: value.password,
    };
    this.authSvc.createUser(data);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
