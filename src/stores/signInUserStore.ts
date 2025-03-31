import { GetUsersUserIdInteractor } from '@/interactor/GetUsersUserIdInteractor';
import { makeAutoObservable } from 'mobx';
import { User } from '@/lib/type';

class SignInUserStore {
  userId: string = "";
  user: User = {
    userId: "",
    email: "",
    userName: "",
    imgUrl: "",
  };
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {
      this.loadStoredUserId();
    }
  }

  private loadStoredUserId() {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      if (storedUserId) {
        this.userId = storedUserId;
      }
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('userId', userId);
      } else {
        sessionStorage.setItem('userId', userId);
      }
    }
  }

  getUserId() {
    return this.userId;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  async getUserFromApi(): Promise<User> {
    this.isLoading = true;
    if (this.userId) {
      const res = await GetUsersUserIdInteractor(this.userId);
      this.setUser(res);
    } else {
      console.log("userId is not found");
    }
    this.isLoading = false;
    return this.user;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  clear() {
    this.user = {
      userId: "",
      email: "",
      userName: "",
      imgUrl: "",
    };
    this.userId = "";
    this.isLoading = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      sessionStorage.removeItem('userId');
    }
  }
}

export const signInUserStore = new SignInUserStore();
