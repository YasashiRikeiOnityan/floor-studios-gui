import axios from 'axios';
import { authStore } from '@/stores/authStore';
import { ApiGetSpecificationGroupsResponse, ApiGetSpecificationsResponse, ApiGetSpecificationsSpecificationIdDownloadResponse, ApiGetTenantResponse, ApiGetTenantSettingsTShirtFabricResponse, ApiGetTenantSettingsTShirtFitResponse, ApiGetUsersUserIdResponse, ApiPostSpecificationsRequest, ApiPutTenantRequest, ApiPutTenantResponse, ApiPutUsersUserIdRequest, SpecificationStatus } from '@/lib/type';
import {
  ApiGetSpecificationsSpecificationIdResponse,
  ApiPutSpecificationsSpecificationIdRequest,
  ApiPutSpecificationsSpecificationIdResponse,
} from '@/lib/type/specification/type';
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

export const ApiGetTenant = async (): Promise<ApiGetTenantResponse> => {
  try {
    const queryParams = {
      kind: "TENANT"
    };
    const response = await httpClient.get('/tenant', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tenant:', error);
    throw error;
  }
};

export const ApiPutTenant = async (tenant: ApiPutTenantRequest): Promise<ApiPutTenantResponse> => {
  try {
    const response = await httpClient.put('/tenant', tenant);
    return response.data;
  } catch (error) {
    console.error('Failed to update tenant:', error);
    throw error;
  }
};

export const ApiGetTenantSettingsTShirtFit = async (): Promise<ApiGetTenantSettingsTShirtFitResponse> => {
  try {
    const queryParams = {
      kind: "SETTINGS#TSHIRT#FIT"
    };
    const response = await httpClient.get('/tenant', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const ApiGetTenantSettingsTShirtFabric = async (): Promise<ApiGetTenantSettingsTShirtFabricResponse> => {
  try {
    const queryParams = {
      kind: "SETTINGS#TSHIRT#FABRIC"
    };
    const response = await httpClient.get('/tenant', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

export const ApiGetSpecifications = async (specificationGroupId: string, status: SpecificationStatus): Promise<ApiGetSpecificationsResponse[]> => {
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

export const ApiGetSpecificationsSpecificationId = async (specificationId: string): Promise<ApiGetSpecificationsSpecificationIdResponse> => {
  try {
    const response = await httpClient.get(`/specifications/${specificationId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch specification:', error);
    throw error;
  }
};

export const ApiPutSpecificationsSpecificationId = async (specificationId: string, specification: ApiPutSpecificationsSpecificationIdRequest): Promise<ApiPutSpecificationsSpecificationIdResponse> => {
  try {
    const response = await httpClient.put(`/specifications/${specificationId}`, specification);
    return response.data;
  } catch (error) {
    console.error('Failed to update specification:', error);
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

export const ApiGetSpecificationsSpecificationIdDownload = async (specificationId: string): Promise<ApiGetSpecificationsSpecificationIdDownloadResponse> => {
  try {
    const response = await httpClient.get(`/specifications/${specificationId}/download`);
    return response.data;
  } catch (error) {
    console.error('Failed to download specification:', error);
    throw error;
  }
};

export const ApiGetSpecificationGroups = async (): Promise<ApiGetSpecificationGroupsResponse[]> => {
  try {
    const response = await httpClient.get('/specificationgroups');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch specification groups:', error);
    return [];
  }
};
