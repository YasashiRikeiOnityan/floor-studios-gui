import axios from 'axios';
import { authStore } from '@/stores/authStore';
import {
  ApiGetSpecificationGroupsResponse,
  ApiGetTenantResponse,
  ApiGetTenantSettingsTShirtFabricResponse,
  ApiGetTenantSettingsTShirtFitResponse,
  ApiGetUsersUserIdResponse,
  ApiPutTenantRequest,
  ApiPutTenantResponse,
  ApiPutUsersUserIdRequest,
} from '@/lib/type';
import {
  ApiGetSpecificationsSpecificationIdResponse,
  ApiGetSpecificationsResponse,
  ApiPostSpecificationsRequest,
  ApiPutSpecificationsSpecificationIdRequest,
  ApiPutSpecificationsSpecificationIdResponse,
  SpecificationStatus,
  ApiPostSpecificationsResponse,
  ApiGetSpecificationsSpecificationIdDownloadResponse,
  ApiGetSpecificationsSpecificationIdPreviewResponse
} from '@/lib/type/specification/type';
import { refreshToken } from "./cognito";
import { CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { ApiPostImagesResponse } from './type/image/type';
import { ApiPostImagesRequest } from './type/image/type';
import {
  ApiPostSpecificationGroupsRequest,
  ApiPostSpecificationGroupsResponse,
  ApiGetSpecificationGroupsSpecificationGroupIdResponse,
  ApiPutSpecificationGroupsSpecificationGroupIdRequest,
  ApiPutSpecificationGroupsSpecificationGroupIdResponse,
  ApiDeleteSpecificationGroupsSpecificationGroupIdResponse,
} from './type/specification_group/type';
import { notificationStore } from '@/stores/notificationStore';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
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
    // 401エラーでまだリトライしていない場合
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
      } catch {
        notificationStore.addNotification("Error", "Authentication failed", "error");
        // リフレッシュトークンも無効な場合はログイン画面にリダイレクト
        window.location.href = '/';
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

export const ApiGetSpecifications = async (specificationGroupId: string, status: SpecificationStatus): Promise<ApiGetSpecificationsResponse> => {
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

export const ApiPostSpecifications = async (specifications: ApiPostSpecificationsRequest): Promise<ApiPostSpecificationsResponse> => {
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
    const response = await httpClient.put(`/specifications/${specificationId}`, specification, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
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

export const ApiGetSpecificationsSpecificationIdPreview = async (specificationId: string): Promise<ApiGetSpecificationsSpecificationIdPreviewResponse> => {
  try {
    const response = await httpClient.get(`/specifications/${specificationId}/preview`);
    return response.data;
  } catch (error) {
    console.error('Failed to preview specification:', error);
    throw error;
  }
};

export const ApiPostImages = async (image: ApiPostImagesRequest): Promise<ApiPostImagesResponse> => {
  try {
    const response = await httpClient.post('/image', image);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to post images:', error);
    return { pre_signed_url: "", key: "" };
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

export const ApiPostSpecificationGroups = async (specificationGroup: ApiPostSpecificationGroupsRequest): Promise<ApiPostSpecificationGroupsResponse> => {
  try {
    const response = await httpClient.post('/specificationgroups', specificationGroup);
    return response.data;
  } catch (error) {
    console.error('Failed to post specification groups:', error);
    throw error;
  }
}

export const ApiGetSpecificationGroupsSpecificationGroupId = async (specificationGroupId: string): Promise<ApiGetSpecificationGroupsSpecificationGroupIdResponse> => {
  try {
    const response = await httpClient.get(`/specificationgroups/${specificationGroupId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch specification groups:', error);
    throw error;
  }
};

export const ApiPutSpecificationGroupsSpecificationGroupId = async (specificationGroupId: string, specificationGroup: ApiPutSpecificationGroupsSpecificationGroupIdRequest): Promise<ApiPutSpecificationGroupsSpecificationGroupIdResponse> => {
  try {
    const response = await httpClient.put(`/specificationgroups/${specificationGroupId}`, specificationGroup);
    return response.data;
  } catch (error) {
    console.error('Failed to update specification groups:', error);
    throw error;
  }
}

export const ApiDeleteSpecificationGroupsSpecificationGroupId = async (specificationGroupId: string): Promise<ApiDeleteSpecificationGroupsSpecificationGroupIdResponse> => {
  try {
    const response = await httpClient.delete(`/specificationgroups/${specificationGroupId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete specification groups:', error);
    throw error;
  }
}