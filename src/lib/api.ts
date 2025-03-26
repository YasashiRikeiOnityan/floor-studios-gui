import { signInUserStore } from '../stores/signInUserStore';
import { authStore } from '../stores/authStore';

export const fetchUser = async (userId: string) => {
  try {
    signInUserStore.setLoading(true);

    const idToken = authStore.getIdToken();
    if (!idToken) {
      throw new Error('認証トークンが見つかりません');
    }

    const response = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'ユーザー情報の取得に失敗しました');
    }

    const user = await response.json();
    signInUserStore.setUser(user);
    return user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '予期せぬエラーが発生しました';
    throw error;
  } finally {
    signInUserStore.setLoading(false);
  }
}; 