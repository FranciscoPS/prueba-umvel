import { Injectable } from '@angular/core';
import { LoginInterface } from './../../models/login.interface';
import { ResponseInterface } from './../../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "https://reqres.in/api"

  constructor(
    private _http: HttpClient
  ) { }

  variables = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  }

  loginByEmail(form: LoginInterface) {
    const direction = `${this.url}/login`;
    return this._http.post(direction, form);
  }

}
