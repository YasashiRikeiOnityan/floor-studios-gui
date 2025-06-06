import { makeAutoObservable, action } from "mobx";

type NotificationType = "success" | "error" | "info";

class NotificationStore {
  isOpenNotification: boolean = true;
  title: string = "Successfully saved";
  message: string = "This is a notification message.";
  type: NotificationType = "error";

  constructor() {
    makeAutoObservable(this, {
      openNotification: action,
      closeNotification: action
    });
  }

  openNotification(title: string, message: string, type: NotificationType, timeout: number = 5000) {
    // Close any existing notification before opening a new one
    this.closeNotification();
     // Ensure minimum timeout of 1 second
    if (timeout < 1000) {
      timeout = 1000;
    }
    // Ensure maximum timeout of 10 seconds
    if (timeout > 10000) {
      timeout = 10000; 
    }
    setTimeout(() => {
      this.closeNotification();
    }, timeout);
    this.isOpenNotification = true;
    this.title = title;
    this.message = message;
    this.type = type;
  }

  closeNotification() {
    this.isOpenNotification = false;
  }
}

export const notificationStore = new NotificationStore();
