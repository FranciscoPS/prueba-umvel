import { Injectable } from '@angular/core';
import { LoginInterface } from './../../models/login.interface';
import { ResponseInterface, UpdateResponseInterface } from './../../models/response.interface';
import { HttpClient } from '@angular/common/http';
import { listUsers } from './../../models/listUsers.interface';
import { postInterface } from './../../models/postsInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "https://reqres.in/api";
  private postsUrl: string = "https://jsonplaceholder.typicode.com";

  constructor(
    private _http: HttpClient
  ) { }

  loginByEmail(form: LoginInterface): Observable<ResponseInterface> {
    const direction = `${this.url}/login`;
    return this._http.post<ResponseInterface>(direction, form);
  }

  getAllUsers(page: number): Observable<listUsers> {
    const direction = `${this.url}/users?page=${page}`;
    return this._http.get<listUsers>(direction);
  }

  updateUser(userId: string, form): Observable<UpdateResponseInterface> {
    const direction = `${this.url}/users/${userId}`;
    return this._http.post<UpdateResponseInterface>(direction, form);
  }

  getPosts(userId: string): Observable<Array<postInterface>> {
    const direction = `${this.postsUrl}/posts?userId=${userId}`;
    return this._http.get<Array<postInterface>>(direction);
  }

  deletePost(postId: string): Observable<any> {
    const direction = `${this.postsUrl}/posts/${postId}`;
    return this._http.delete<any>(direction);
  }

}
