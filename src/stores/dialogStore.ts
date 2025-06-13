import { makeAutoObservable, action } from "mobx";

class DialogStore {
  isOpenAlertDialog: boolean = false;
  title: string = "";
  message: string = "";
  buttonText: string = "";
  noCancelButton: boolean = false;
  onClickButton: () => void = () => {};

  isOpenSuccessDialog: boolean = false;
  successDialogTitle: string = "";
  successDialogMessage: string = "";
  successDialogButtonText: string = "";
  successDialogOnClick: () => void = () => {};

  constructor() {
    makeAutoObservable(this, {
      openAlertDialog: action,
      closeAlertDialog: action,
      openSuccessDialog: action,
      closeSuccessDialog: action,
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

  openSuccessDialog(title: string, message: string, buttonText: string, onClick: () => void) {
    this.isOpenSuccessDialog = true;
    this.successDialogTitle = title;
    this.successDialogMessage = message;
    this.successDialogButtonText = buttonText;
    this.successDialogOnClick = onClick;
  }

  closeSuccessDialog() {
    this.isOpenSuccessDialog = false;
    this.successDialogOnClick = () => {};
  }
}

export const dialogStore = new DialogStore();
