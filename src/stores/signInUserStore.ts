import { GetUsersUserIdInteractor } from '@/interactor/GetUsersUserIdInteractor';
import { makeAutoObservable } from 'mobx';
import { User } from '@/lib/type';
import { UpdateUsersUserIdInteractor } from '@/interactor/PutUsersUserIdInteractor';

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

  async getUserFromApi(userId: string): Promise<User> {
    this.setLoading(true);
    try {
      const res = await GetUsersUserIdInteractor(userId);
      this.setUser(res);
      return res;
    } finally {
      this.setLoading(false);
    }
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
  }
}

export const signInUserStore = new SignInUserStore();
