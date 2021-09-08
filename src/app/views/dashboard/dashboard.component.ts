import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { user, listUsers } from './../../models/listUsers.interface';
import { NotificationsService } from './../../services/notifications/notifications.service';
import { postInterface } from './../../models/postsInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;
  public showDetail: boolean = false;
  public listUsers: listUsers;
  public nzTotalPages: number = 0;
  public users: Array<user> = [];
  public postsCurrentUser: Array<postInterface> = [];
  public currentUser: user;

  constructor(
    private _apiService: ApiService,
    private _notification: NotificationsService
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
    this._notification.createSuccessNotification('Users loaded correctly');
  }

  onIndexChange(page): void {
    this.getUsersByPage(page);
  }

  showDetails(user: user): void {
    this.currentUser = user;
    this.showDetail = true;

    const response = this._apiService.getPosts(user.id)
    response.subscribe(this.setCurrentPosts.bind(this), this.onError.bind(this));
  }

  setCurrentPosts(res): void {
    this.postsCurrentUser = res;
    console.log(this.currentUser);
    console.log(this.postsCurrentUser);
  }

  onError(error): void {
    this.loading = false;
    this._notification.createSuccessNotification(error['error']);
  }

  close(): void {
    this.showDetail = false;
  }

}
