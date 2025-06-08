import { makeAutoObservable, action } from "mobx";

class DialogStore {
  isOpenAlertDialog: boolean = false;
  title: string = "";
  message: string = "";
  buttonText: string = "";
  noCancelButton: boolean = false;
  onClickButton: () => void = () => {};

  constructor() {
    makeAutoObservable(this, {
      openAlertDialog: action,
      closeAlertDialog: action
    });
  }

  openAlertDialog(title: string, message: string, buttonText: string, noCancelButton: boolean, onClickButton: () => void) {
    this.isOpenAlertDialog = true;
    this.title = title;
    this.message = message;
    this.buttonText = buttonText;
    this.noCancelButton = noCancelButton;
    this.onClickButton = onClickButton;
  }

  closeAlertDialog() {
    this.isOpenAlertDialog = false;
    this.onClickButton = () => {};
  }
}

export const dialogStore = new DialogStore();
