import { makeAutoObservable} from 'mobx';

class AuthStore {
  idToken: string = "";
  refreshToken: string = "";
  rememberMe: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(idToken: string, refreshToken: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("refreshToken", refreshToken);
      this.rememberMe = true;
      this.idToken = idToken;
      this.refreshToken = refreshToken;
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("idToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.setItem("rememberMe", "false");
      sessionStorage.setItem("idToken", idToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      this.rememberMe = false;
      this.idToken = idToken;
      this.refreshToken = refreshToken;
    }
  }

  getIdToken() {
    const localStorageRememberMe = localStorage.getItem("rememberMe") || "";
    console.log(localStorageRememberMe);
    if (localStorageRememberMe === "true") {
      console.log(localStorage.getItem("idToken"));
      return localStorage.getItem("idToken");
    }
    const sessionStorageRememberMe = sessionStorage.getItem("rememberMe") || "";
    if (sessionStorageRememberMe === "false") {
      return sessionStorage.getItem("idToken");
    }
    return this.idToken;
  }

  getRefreshToken() {
    const localStorageRememberMe = localStorage.getItem("rememberMe") || "";
    if (localStorageRememberMe === "true") {
      return localStorage.getItem("refreshToken");
    }
    const sessionStorageRememberMe = sessionStorage.getItem("rememberMe") || "";
    if (sessionStorageRememberMe === "false") {
      return sessionStorage.getItem("refreshToken");
    }
    return this.refreshToken;
  }

  clear() {
    this.idToken = "";
    this.refreshToken = "";
    this.rememberMe = false;
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("rememberMe");
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("refreshToken");
    // ローカルストレージからCognitoIdentityServiceProviderを削除
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("CognitoIdentityServiceProvider")) {
        localStorage.removeItem(key);
      }
    });
  }
}

export const authStore = new AuthStore();

