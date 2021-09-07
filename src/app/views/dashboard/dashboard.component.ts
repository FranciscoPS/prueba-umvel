import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { user } from './../../models/listUsers.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: Array<user> = [];

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsersByPage(1234);
  }

  getUsersByPage(page: number): void {
    const response = this._apiService.getAllUsers(page);
    response.subscribe(this.onSuccessGetUsers.bind(this), this.onError.bind(this));
  }

  onSuccessGetUsers(response): void {
    this.users = response['data'];
    console.log(this.users)
  }

  onError(error): void {
    alert(error['error']);
  }

}
