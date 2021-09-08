import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { user, listUsers } from './../../models/listUsers.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;
  public listUsers: listUsers;
  public nzTotalPages: number = 0;
  public users: Array<user> = [];

  constructor(
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUsersByPage(1);
  }

  getUsersByPage(page: number): void {
    const response = this._apiService.getAllUsers(page);
    response.subscribe(this.onSuccessGetUsers.bind(this), this.onError.bind(this));
  }

  onSuccessGetUsers(response): void {
    this.listUsers = response;
    this.users = this.listUsers['data'];
    this.nzTotalPages = Number(this.listUsers.total_pages) * 10;
    this.loading = false;
    this.createNotification('success');
  }

  onError(error): void {
    alert(error['error']);
    this.loading = false;
  }

  onIndexChange(page) {
    this.getUsersByPage(page);
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }

}
