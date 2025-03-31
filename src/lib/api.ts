import axios from 'axios';
import { authStore } from '@/stores/authStore';
import { ApiGetUsersUserIdResponse } from './type';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const idToken = authStore.getIdToken();

export const ApiGetUsers = async () => {
  try {
    const url = "/users"
    const response = await httpClient.get(url, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      }
    })
    console.log(response.data.body)
  } catch (error) {
    console.log(error)
  }
};

export const ApiGetUsersUserId = async (userId: string): Promise<ApiGetUsersUserIdResponse> => {
  const url = `/users/${userId}`
  const response = await httpClient.get(url, {
    headers: {
      "Authorization": `Bearer ${idToken}`,
    }
  });
  return response.data.body;
}
