import * as authStore from '../store/index';
import { AuthService } from '../../common/services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOGIN } from '../store/actions/auth.actions';
import { Router } from '@angular/router';
import { StorageService } from '../../common/services/storage.service';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'ota-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;
  isLogging = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<any>,
    private storageService: StorageService,
    private router: Router,
    private cookieService: CookieService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.isLogin();
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login(formData) {
    this.isLogging = true;
    this.store.dispatch({
      type: LOGIN,
      payload: {
        account: formData.account.trim(),
        password: formData.password.trim()
      }
    });

    this.store.select(authStore.selectLoginState).subscribe(res => {
      if (res !== null) {
        this.toastr.warning(res);
        this.isLogging = false;
        return;
      }
    });

    this.store.select(authStore.selectAuthStatusState).subscribe(res => {
      if (res) {
        const isLogin = this.cookieService.get(environment.cookieKey);
        if (isLogin === undefined) {
          this.cookieService.put(environment.cookieKey, 'true');
        }
      }
    });
  }

  isLogin() {
    const isLogin = this.cookieService.get(environment.cookieKey);
    if (isLogin !== undefined) {
      this.router.navigate(['online-training/portal/path']);
    }
    return;
  }
}
