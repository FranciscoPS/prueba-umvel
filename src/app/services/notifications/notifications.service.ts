import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notification: NzNotificationService) { }

  createSuccessNotification(message: string): void {
    this.notification.create(
      'success',
      'Success',
      message
    );
  }

  createErrorNotification(message: string): void {
    this.notification.create(
      'error',
      'Error',
      message
    );
  }
}
