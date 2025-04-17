import { GetUsersUserIdInteractor } from '@/interactor/GetUsersUserIdInteractor';
import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '@/lib/type';
import { UpdateUsersUserIdInteractor } from '@/interactor/PutUsersUserIdInteractor';
import { authStore } from './authStore';

class SignInUserStore {
  userId: string = "";
  user: User = {
    userId: "",
    email: "",
    userName: "",
    imageUrl: "",
  };
  isFetched: boolean = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    if (this.userId !== "") {
      return this.userId;
    }
    const idToken = authStore.getIdToken() || "";
    if (idToken !== "") {
      const userId = JSON.parse(atob(idToken.split(".")[1])).sub;
      this.userId = userId;
      return userId;
    }
    return "";
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  async fetchUser(userId: string): Promise<User> {
    if (this.isFetched) {
      return this.user;
    }
    runInAction(() => {
      this.setLoading(true);
    });
    const res = await GetUsersUserIdInteractor(userId);
    runInAction(() => {
      this.setUser(res);
      this.setIsFetched(true);
      this.setLoading(false);
    });
    return res;
  }

  async putUserToApi(userId: string, user: {userName: string}): Promise<User> {
    this.setLoading(true);
    try {
      const res = await UpdateUsersUserIdInteractor(userId, user);
      this.setUser(res);
      return res;
    } finally {
      this.setLoading(false);
    }
  }

  setIsFetched(isFetched: boolean) {
    this.isFetched = isFetched;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  clear() {
    this.user = {
      userId: "",
      email: "",
      userName: "",
      imageUrl: "",
    };
    this.userId = "";
    this.isLoading = false;
  }
}

export const signInUserStore = new SignInUserStore();
