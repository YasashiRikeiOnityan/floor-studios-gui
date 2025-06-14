import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';

// 環境変数
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
};

// ユーザープール
export const userPool = new CognitoUserPool(poolData);

// サインアップ
export const signUp = (email: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      console.log(result);
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// サインアップ確認
export const confirmSignUp = (email: string, code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      console.log(result);
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// サインイン
export const signIn = (email: string, password: string): Promise<{ idToken: string; refreshToken: string }> => {
  return new Promise((resolve, reject) => {
    // 認証詳細
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    // ユーザーデータ
    const userData = {
      Username: email,
      Pool: userPool,
    };

    // ユーザー
    const cognitoUser = new CognitoUser(userData);

    // 認証
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// サインアウト
export const signOut = async (email: string): Promise<void> => {
  return new Promise((resolve) => {
    // ユーザーデータ
    const userData = {
      Username: email,
      Pool: userPool,
    };

    // ユーザー
    const cognitoUser = new CognitoUser(userData);

    // サインアウト
    cognitoUser.signOut(() => {
      resolve();
    });
  });
};

// トークン更新
export const refreshToken = (refreshToken: CognitoRefreshToken): Promise<{ idToken: string }> => {
  return new Promise((resolve, reject) => {
    // ユーザーデータ
    const userData = {
      Username: '',
      Pool: userPool,
    };

    // ユーザー
    const cognitoUser = new CognitoUser(userData);

    // トークン更新
    cognitoUser.refreshSession(refreshToken, (err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        idToken: session.getIdToken().getJwtToken(),
      });
    });
  });
};

// パスワード忘れ
export const forgotPassword = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // ユーザーデータ
    const userData = {
      Username: email,
      Pool: userPool,
    };

    // ユーザー
    const cognitoUser = new CognitoUser(userData);

    // パスワード忘れ
    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// パスワード忘れ確認
export const confirmForgotPassword = (
  email: string,
  code: string,
  newPassword: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // ユーザーデータ
    const userData = {
      Username: email,
      Pool: userPool,
    };

    // ユーザー
    const cognitoUser = new CognitoUser(userData);

    // パスワード忘れ確認
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};
