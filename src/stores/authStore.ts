import { makeAutoObservable } from 'mobx';
import { CognitoUser } from 'amazon-cognito-identity-js';

class AuthStore {
  isAuthenticated = false;
  idToken: string | null = null;
  user: CognitoUser | null = null;
  rememberMe = false;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.loadStoredAuth();
    }
  }

  private loadStoredAuth() {
    if (typeof window !== 'undefined') {
      const storedIdToken = localStorage.getItem('idToken');
      const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
      
      if (storedIdToken) {
        this.idToken = storedIdToken;
        this.isAuthenticated = true;
        this.rememberMe = storedRememberMe;
      }

    }
  }

  setAuth(idToken: string, rememberMe: boolean = false) {
    this.idToken = idToken;
    this.isAuthenticated = true;
    this.rememberMe = rememberMe;

    if (typeof window !== 'undefined') {
      if (rememberMe) {
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('idToken', idToken);
        sessionStorage.setItem('rememberMe', 'false');
      }
    }
  }

  clearAuth() {
    this.idToken = null;
    this.isAuthenticated = false;
    this.user = null;
    this.rememberMe = false;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('idToken');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('idToken');
      sessionStorage.removeItem('rememberMe');
    }
  }

  setUser(user: CognitoUser) {
    this.user = user;
  }

  setRememberMe(rememberMe: boolean) {
    this.rememberMe = rememberMe;
    if (typeof window !== 'undefined') {
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        sessionStorage.removeItem('rememberMe');
      } else {
        sessionStorage.setItem('rememberMe', 'false');
        localStorage.removeItem('rememberMe');
      }
    }
  }

  getIdToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    if (this.rememberMe) {
      return localStorage.getItem('idToken');
    } else {
      return sessionStorage.getItem('idToken');
    }
  }
}

export const authStore = new AuthStore();

