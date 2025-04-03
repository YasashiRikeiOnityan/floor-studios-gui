import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoRefreshToken } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

export const userPool = new CognitoUserPool(poolData);

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

export const signIn = (email: string, password: string): Promise<{ idToken: string; refreshToken: string }> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

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

export const signOut = async (email: string): Promise<void> => {
  return new Promise((resolve) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut(() => {
      resolve();
    });
  });
};

export const refreshToken = (refreshToken: CognitoRefreshToken): Promise<{ idToken: string }> => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: '',
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

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
