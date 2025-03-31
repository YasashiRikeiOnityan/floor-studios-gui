export type ApiGetUsersUserIdResponse = {
  user_id: string;
  email: string;
  user_name?: string;
  img_url?: string;
}

export type User = {
  userId: string;
  email?: string;
  userName?: string;
  imgUrl?: string;
}