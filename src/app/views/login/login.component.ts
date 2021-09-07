import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../../services/api/api.service';
import { LoginInterface } from './../../models/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean = false;
  public errorStatus: boolean = false;
  public errorMessage: string = '';

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLogin(form: LoginInterface): void {
    this.loading = true;
    const response = this._apiService.loginByEmail(form);
    response.subscribe(this.onSuccessLogin.bind(this), this.onBadRequest.bind(this));
  }

  onSuccessLogin(res): void {
    this.errorStatus = false;
    localStorage.setItem('token', res['token']);
    this._router.navigate(['dashboard']);
    this.loading = false;
  }

  onBadRequest(err): void {
    this.errorStatus = true;
    this.errorMessage = err['error'].error;
    this.loading = false;
  }

}
