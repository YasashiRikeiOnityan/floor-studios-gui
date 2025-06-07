"use client";

import { makeAutoObservable} from 'mobx';

class AuthStore {
  idToken: string = "";
  refreshToken: string = "";
  rememberMe: boolean = false;
  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.loadStoredAuth();
    }
  }

  private loadStoredAuth() {
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe === "true") {
      this.rememberMe = true;
      this.idToken = localStorage.getItem("idToken") || "";
      this.refreshToken = localStorage.getItem("refreshToken") || "";
    } else if (storedRememberMe === "false") {
      this.rememberMe = false;
      this.idToken = sessionStorage.getItem("idToken") || "";
      this.refreshToken = sessionStorage.getItem("refreshToken") || "";
    }
  }

  setAuth(idToken: string, refreshToken: string, rememberMe: boolean) {
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.rememberMe = rememberMe;
    if (rememberMe) {
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('rememberMe', 'true');
    } else {
      sessionStorage.setItem('idToken', idToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('rememberMe', 'false');
    }
  }

  getIdToken() {
    if (typeof window === 'undefined') return this.idToken;
    const localStorageRememberMe = localStorage.getItem("rememberMe") || "";
    if (localStorageRememberMe === "true") {
      return localStorage.getItem("idToken");
    }
    const sessionStorageRememberMe = sessionStorage.getItem("rememberMe") || "";
    if (sessionStorageRememberMe === "false") {
      return sessionStorage.getItem("idToken");
    }
    return this.idToken;
  }

  getRefreshToken() {
    if (typeof window === 'undefined') return this.refreshToken;
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

  clearAuth() {
    this.idToken = '';
    this.refreshToken = '';
    this.rememberMe = false;
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('rememberMe');
  }
}

export const authStore = new AuthStore();

