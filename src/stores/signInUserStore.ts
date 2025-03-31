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
  }

  setUserId(userId: string) {
    this.userId = userId;
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
    if (this.userId) {
      const res = await GetUsersUserIdInteractor(this.userId);
      this.setUser(res);
    } else {
      console.log("userId is not found");
    }
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
    this.isLoading = false;
  }
}

export const signInUserStore = new SignInUserStore();
