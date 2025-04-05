import { ApiGetUsersUserId } from "@/lib/api"
import { ApiGetUsersUserIdResponse } from "@/lib/type";

export const GetUsersUserIdInteractor = async (userId: string) => {
  const response = await ApiGetUsersUserId(userId);
  return mapUser(response);
}

const mapUser = (user: ApiGetUsersUserIdResponse) => {
  return {
    userId: user.user_id,
    email: user.email,
    userName: user?.user_name || "",
    imageUrl: user?.image_url || "",
  }
}