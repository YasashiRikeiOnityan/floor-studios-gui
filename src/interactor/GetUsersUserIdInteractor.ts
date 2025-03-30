import { ApiGetUsersUserId } from "@/lib/api"
import { ApiGetUsersUserIdResponse } from "@/lib/type";

export const GetUsersUserIdInteractor = async (userId: string) => {
  const response = await ApiGetUsersUserId(userId);
  return mapUser(response);
}

const mapUser = (user: ApiGetUsersUserIdResponse) => {
  return {
    userId: user.userId,
    email: user.email || "",
    userName: user.userName || "",
    imgUrl: user.imgUrl || "",
  }
}