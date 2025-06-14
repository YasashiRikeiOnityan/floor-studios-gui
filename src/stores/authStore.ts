"use client";

import { makeAutoObservable } from 'mobx';
import { refreshToken } from '@/lib/cognito';
import { CognitoRefreshToken } from 'amazon-cognito-identity-js';

class AuthStore {
  idToken: string = "";
  refreshToken: string = "";
  rememberMe: boolean = false;
  private tokenRefreshTimeout: NodeJS.Timeout | null = null;
  private scheduleTokenRefresh: () => void = () => {};

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.loadStoredAuth();
      this.setupTokenRefresh();
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

  private setupTokenRefresh() {
    // トークンの有効期限をチェックし、必要に応じて更新
    const checkAndRefreshToken = async () => {
      if (!this.idToken || !this.refreshToken) return;

      try {
        const payload = JSON.parse(atob(this.idToken.split(".")[1]));
        const expirationTime = payload.exp * 1000; // ミリ秒に変換
        const currentTime = Date.now();
        const timeUntilExpiry = expirationTime - currentTime;

        // トークンが30分以内に期限切れになる場合、更新
        if (timeUntilExpiry < 30 * 60 * 1000) {
          await this.refreshAuthToken();
        }

        // 次のチェックをスケジュール
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error("Token refresh check failed:", error);
        this.clearAuth();
      }
    };

    this.scheduleTokenRefresh = () => {
      if (this.tokenRefreshTimeout) {
        clearTimeout(this.tokenRefreshTimeout);
      }
      this.tokenRefreshTimeout = setTimeout(checkAndRefreshToken, 5 * 60 * 1000); // 5分ごとにチェック
    };

    checkAndRefreshToken();
  }

  private async refreshAuthToken() {
    try {
      const cognitoRefreshToken = new CognitoRefreshToken({ RefreshToken: this.refreshToken });
      const { idToken } = await refreshToken(cognitoRefreshToken);
      this.idToken = idToken;
      this.saveTokens();
    } catch (error) {
      console.error("Token refresh failed:", error);
      this.clearAuth();
      throw error;
    }
  }

  private saveTokens() {
    if (this.rememberMe) {
      localStorage.setItem('idToken', this.idToken);
      localStorage.setItem('refreshToken', this.refreshToken);
      localStorage.setItem('rememberMe', 'true');
    } else {
      sessionStorage.setItem('idToken', this.idToken);
      sessionStorage.setItem('refreshToken', this.refreshToken);
      sessionStorage.setItem('rememberMe', 'false');
    }
  }

  setAuth(idToken: string, refreshToken: string, rememberMe: boolean) {
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.rememberMe = rememberMe;
    this.saveTokens();
    this.setupTokenRefresh();
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
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('rememberMe');
  }

  isAuthenticated(): boolean {
    return !!this.idToken && !!this.refreshToken;
  }
}

export const authStore = new AuthStore();

