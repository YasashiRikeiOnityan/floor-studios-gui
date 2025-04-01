import { ApiPutUsersUserId } from "@/lib/api";
import { ApiPutUsersUserIdRequest, ApiPutUsersUserIdResponse, User } from "@/lib/type";

export const UpdateUsersUserIdInteractor = async (userId: string, user: {userName: string}) => {
  const requestBody = getRequestBody(user);
  const response = await ApiPutUsersUserId(userId, requestBody);
  return mapUser(response);
}

const getRequestBody = (user: {userName: string}): ApiPutUsersUserIdRequest => {
  let requestBody: ApiPutUsersUserIdRequest = {};
  if (user.userName) {
    requestBody.user_name = user.userName;
  }
  return requestBody;
}

const mapUser = (user: ApiPutUsersUserIdResponse) => {
  return {
    userId: user.user_id,
    email: user.email,
    userName: user?.user_name || "",
    imgUrl: user?.img_url || "",
  }
}
