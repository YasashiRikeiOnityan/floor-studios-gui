import { makeAutoObservable } from "mobx";

export type NotificationType = "success" | "error" | "info";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timeout: number;
}

class NotificationStore {
  notifications: Notification[] = [];
  maxVisibleNotifications = 2;

  constructor() {
    makeAutoObservable(this);
  }

  addNotification(title: string, message: string, type: NotificationType, timeout: number = 5000) {
    // タイムアウトの制限
    if (timeout < 1000) timeout = 1000;
    if (timeout > 10000) timeout = 10000;

    const id = Math.random().toString(36).substring(7);
    const notification: Notification = {
      id,
      title,
      message,
      type,
      timeout
    };

    this.notifications.push(notification);

    // タイムアウトの設定
    setTimeout(() => {
      this.removeNotification(id);
    }, timeout);
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  get visibleNotifications() {
    return this.notifications.slice(0, this.maxVisibleNotifications);
  }
}

export const notificationStore = new NotificationStore();
