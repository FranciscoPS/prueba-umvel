import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { user, listUsers } from './../../models/listUsers.interface';
import { NotificationsService } from './../../services/notifications/notifications.service';
import { postInterface } from './../../models/postsInterface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;
  public showDetail: boolean = false;
  public editable: boolean = false;
  public listUsers: listUsers;
  public nzTotalPages: number = 0;
  public users: Array<user> = [];
  public postsCurrentUser: Array<postInterface> = [];
  public currentUser: user;
  public personalInfoForm: FormGroup;

  constructor(
    private _apiService: ApiService,
    private _notification: NotificationsService,
    private modal: NzModalService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUsersByPage(1);
  }

  initPersonalInfoForm() {
    this.personalInfoForm = this._formBuilder.group({
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      first_name: [this.currentUser.first_name, [Validators.required]],
      last_name: [this.currentUser.last_name, [Validators.required]],
    })
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
  }

  confirmDelete(postId): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete this post?</i>',
      nzContent: '<b>Changes cannot be reversed</b>',
      nzOnOk: () => this.deletePost(postId)
    });
  }

  deletePost(postId): void {
    const response = this._apiService.deletePost(postId);
    response.subscribe(this.onSuccessDeletePost.bind(this), this.onError.bind(this));
  }

  onSuccessDeletePost(res): void {
    this._notification.createSuccessNotification('The post was correctly deleted');
    this.showDetail = false;
  }

  editPersonalInfo(): void {
    this.initPersonalInfoForm();
    this.editable = true;
  }

  onError(error): void {
    this.loading = false;
    this._notification.createSuccessNotification(error['error']);
  }

  saveData(): void {
    const currentId = this.currentUser.id;
    const form = this.personalInfoForm.value;
    const response = this._apiService.updateUser(currentId, form);
    response.subscribe(this.onSuccesSaveData.bind(this), this.onError.bind(this));
  }

  onSuccesSaveData(res): void {
    this._notification.createSuccessNotification(`The info was correctly saved! Info updated at ${res['createdAt']}`);
    this.editable = false;
  }

  undo(): void {
    this.editable = false;
  }

  close(): void {
    this.showDetail = false;
    this.editable = false;
  }

}
