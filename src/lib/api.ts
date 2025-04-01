import axios from 'axios';
import { authStore } from '@/stores/authStore';
import { ApiGetUsersUserIdResponse, ApiPutUsersUserIdRequest} from '@/lib/type';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const ApiGetUsers = async () => {
  try {
    const url = "/users"
    const response = await httpClient.get(url, {
      headers: {
        Authorization: `Bearer ${authStore.getIdToken()}`,
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
      "Authorization": `Bearer ${authStore.getIdToken()}`,
    }
  });
  return response.data;
}

export const ApiPutUsersUserId = async (userId: string, user: ApiPutUsersUserIdRequest) => {
  const url = `/users/${userId}`
  const response = await httpClient.put(url, user, {
    headers: {
      "Authorization": `Bearer ${authStore.getIdToken()}`,
      "Content-Type": "application/json",
    }
  });
  return response.data;
}

export const ApiDeleteUsersUserId = async (userId: string) => {
  const url = `/users/${userId}`
  const response = await httpClient.delete(url, {
    headers: {
      "Authorization": `Bearer ${authStore.getIdToken()}`,
    }
  });
  return response.data;
}
