import { makeAutoObservable} from 'mobx';

class AuthStore {
  idToken: string = "";
  rememberMe: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIdToken(idToken: string) {
    this.idToken = idToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setRememberMe(rememberMe: boolean) {
    this.rememberMe = rememberMe;
  }

  getRememberMe() {
    return this.rememberMe;
  }

  clear() {
    this.idToken = "";
    this.rememberMe = false;
  }
}

export const authStore = new AuthStore();

