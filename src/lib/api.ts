import { authStore } from '@/stores/authStore';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const idToken = authStore.idToken;

export const ApiGetUsers = async () => {
  try {
    const url = "/users"
    const response = await httpClient.get(url, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      }
    })
    console.log(response.data.body)
  } catch (error) {
    console.log(error)
  }
};
