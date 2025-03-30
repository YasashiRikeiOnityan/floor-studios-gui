import { makeAutoObservable } from 'mobx';

type User = {
  userId: string,
  email: string,
  userName: string,
  imgUrl: string,
}

class SignInUserStore {
  userId: string = "";
  user: User | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  clear() {
    this.user = null;
    this.isLoading = false;
  }
}

export const signInUserStore = new SignInUserStore();
