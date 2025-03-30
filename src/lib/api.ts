import axios from 'axios';
import { authStore } from '@/stores/authStore';
import { ApiGetUsersUserIdResponse } from './type';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const idToken = "eyJraWQiOiJ5cndVNndyQTBWN2grRVZWWG5QVjhuOEhSeFg5NHhEMVhnRlZ2T0FuNmswPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4N2E0MWEyOC0zMDcxLTcwMjUtZWY5YS1hZTYyODFkM2RkNGMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX1ZZbDBabkJEWCIsImNvZ25pdG86dXNlcm5hbWUiOiI4N2E0MWEyOC0zMDcxLTcwMjUtZWY5YS1hZTYyODFkM2RkNGMiLCJjdXN0b206dGVuYW50X2lkIjoiOTllYTQ4MGEtN2VlMi00NzE4LWE0MzEtMjA5M2FjM2JlYjlhIiwib3JpZ2luX2p0aSI6IjI5OTljOGE3LTdjNzItNGI0Ni1hZTQzLTU1ZjBmODJkMWU2YyIsImF1ZCI6IjRuMXRmdnR1bGcyYmJpMWRhZ2IxNjQycm50IiwiZXZlbnRfaWQiOiI3Nzc5NTQ1MC1kZjU2LTRjZGYtYWRkZC03YzJiYTZmNGFmNGIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc0MzMxNjgyNCwiZXhwIjoxNzQzMzIwNDI0LCJpYXQiOjE3NDMzMTY4MjQsImp0aSI6IjEzM2YwNjg3LWVmMTAtNDk3Mi04ZmQzLWIxMGQxYzE5MjU5MiIsImVtYWlsIjoibmFuc2hhbmx1NTI0QGdtYWlsLmNvbSJ9.oLYlkFfVADEZVkmip76MBKqBUBRwkJ0jW4g9vb_hb6_IiOo1JVA26DR82Bhk3UolCuq4des754jyvvkTFdupi0Zc04GJFJ8h2D5ABHKP4RDC_BlY1bY2GYq7Uqj4nDBdizr3KFgu0XbxalONWybiJ0L4Y9Y2q4PcLSri9tGKfTGc0v2YyLAdOh62UInEAxix49oDNXSyd1sHc38MJ4pDkezFY5ScD_G-1-TwAssXjB_epFYY2hoPI6QjGhq4pthqA2v-Y0G2IJqwtSttnklOcjFtNP9ZD6Y7EHrdgFRjkxajeeuTGDLRUVpmPD4KCrXbEv3T5IHMfrkhazeXauYRqw";

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

export const ApiGetUsersUserId = async (userId: string): Promise<ApiGetUsersUserIdResponse> => {
  const url = `/users/${userId}`
  const response = await httpClient.get(url, {
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Access-Control-Allow-Origin": "*",
    }
  });
  return response.data.body;
}
