import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../../services/api/api.service';
import { LoginInterface } from './../../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private _apiService: ApiService
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
    console.log(res)
    alert('Welcome!');
    this.loading = false;
  }

  onBadRequest(err): void {
    console.log(err);
    alert('Invalid user or password, please try again');
    this.loading = false;
  }

}
