import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  private authStatusSub: Subscription;

  constructor(private formBuilder: FormBuilder, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.logout();
    this.formGroup = this.formBuilder.group({
      username: '',
      password: '',
    });

    this.authStatusSub = this.authSvc
      .getAuthStatusListner()
      .subscribe(() => {});
  }

  onLogin() {
    const value = this.formGroup.value;
    const data: AuthData = {
      username: value.username,
      password: value.password,
    };
    this.authSvc.login(data);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
