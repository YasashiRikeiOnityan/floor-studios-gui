import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
};

export const userPool = new CognitoUserPool(poolData);

export const signUp = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const confirmSignUp = async (email: string, code: string) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err: Error | null, result: string) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const signIn = async (email: string, password: string): Promise<{ user: CognitoUser; idToken: string }> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          user: cognitoUser,
          idToken: result.getIdToken().getJwtToken()
        });
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};

export const signOut = async (user: CognitoUser): Promise<void> => {
  return new Promise((resolve, reject) => {
    (user.signOut as (callback: (err: Error | null) => void) => void)((err: Error | null) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
