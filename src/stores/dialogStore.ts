import { makeAutoObservable, action } from "mobx";

class DialogStore {
  isOpenAlertDialog: boolean = false;
  title: string = "";
  message: string = "";
  buttonText: string = "";
  onClickButton: () => void = () => {};

  constructor() {
    makeAutoObservable(this, {
      openAlertDialog: action,
      closeAlertDialog: action
    });
  }

  openAlertDialog(title: string, message: string, buttonText: string, onClickButton: () => void) {
    this.isOpenAlertDialog = true;
    this.title = title;
    this.message = message;
    this.buttonText = buttonText;
    this.onClickButton = onClickButton;
  }

  closeAlertDialog() {
    this.isOpenAlertDialog = false;
    this.title = "";
    this.message = "";
    this.buttonText = "";
    this.onClickButton = () => {};
  }
}

export const dialogStore = new DialogStore();
