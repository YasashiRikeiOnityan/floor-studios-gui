import { makeAutoObservable, runInAction } from "mobx";
import { GetUsersUserIdInteractor } from "@/interactor/GetUsersUserIdInteractor";

type User = {
    userId: string,
    email: string,
    userName: string,
    imgUrl: string,
  }

class UserStore {
  user: User | undefined = undefined;
  loading: boolean = false;
  error: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(userId: string) {
    this.loading = true;
    this.error = undefined;
    try {
      const response = await GetUsersUserIdInteractor(userId);
      runInAction(() => {
        this.user = response;
      });
    } catch (error) {
      runInAction(() => {
        console.error("Error fetching user:", error);
      });
    }
    this.loading = false;
  }
}

export const userStore = new UserStore();
