import axios from 'axios';
import { authStore } from '@/stores/authStore';
import { ApiGetSpecificationsResponse, ApiGetUsersUserIdResponse, ApiPostSpecificationsRequest, ApiPutUsersUserIdRequest, SpecificationStatus } from '@/lib/type';
import { refreshToken } from "./cognito";
import { CognitoRefreshToken } from 'amazon-cognito-identity-js';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// リクエストインターセプター
httpClient.interceptors.request.use(
  (config) => {
    const idToken = authStore.getIdToken();
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401エラーで、まだリトライしていない場合
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // リフレッシュトークンを使用して新しいIDトークンを取得
        const refreshTokenValue = new CognitoRefreshToken({
          RefreshToken: authStore.getRefreshToken() || "",
        });

        const { idToken } = await refreshToken(refreshTokenValue);
        authStore.setAuth(idToken, refreshTokenValue.getToken(), authStore.rememberMe);

        // 新しいトークンでリクエストを再試行
        originalRequest.headers.Authorization = `Bearer ${idToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // リフレッシュトークンも無効な場合は認証エラーをスロー
        throw new Error('Authentication failed');
      }
    }

    return Promise.reject(error);
  }
);

export const ApiGetUsers = async () => {
  try {
    const response = await httpClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const ApiGetUsersUserId = async (userId: string): Promise<ApiGetUsersUserIdResponse> => {
  try {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

export const ApiPutUsersUserId = async (userId: string, user: ApiPutUsersUserIdRequest) => {
  try {
    const response = await httpClient.put(`/users/${userId}`, user);
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

export const ApiDeleteUsersUserId = async (userId: string) => {
  try {
    const response = await httpClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

export const ApiGetSpecifications = async (specificationGroupId: string | undefined, status: SpecificationStatus): Promise<ApiGetSpecificationsResponse[]> => {
  try {
    const queryParams = {
      specification_group_id: specificationGroupId,
      status: status,
    };
    const response = await httpClient.get('/specifications', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch specifications:', error);
    return [];
  }
};

export const ApiPostSpecifications = async (specifications: ApiPostSpecificationsRequest) => {
  try {
    const response = await httpClient.post('/specifications', specifications);
    return response.data;
  } catch (error) {
    console.error('Failed to post specifications:', error);
    throw error;
  }
};

export const ApiDeleteSpecificationsSpecificationId = async (specificationId: string) => {
  try {
    const response = await httpClient.delete(`/specifications/${specificationId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete specification:', error);
    throw error;
  }
}
