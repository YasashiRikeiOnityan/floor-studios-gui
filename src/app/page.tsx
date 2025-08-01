"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/authStore";
import { confirmSignUp, signIn, signUp, forgotPassword, confirmForgotPassword } from "@/lib/cognito";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInUserStore } from "@/stores/signInUserStore";
import Tabs from "@/components/Tabs";
import Notification from "@/components/Notification";

const Home = observer(() => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [validateEmailError, setValidateEmailError] = useState("");
  const [validatePasswordError, setValidatePasswordError] = useState("");
  const [validateVerificationCodeError, setValidateVerificationCodeError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [tabState, setTabState] = useState("Sign in");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // ローカルストレージのトークンを使用して自動ログインを試みる
  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const idToken = localStorage.getItem('idToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';

        if (idToken && refreshToken && rememberMe) {
          // トークンをストアに設定
          authStore.setAuth(idToken, refreshToken, rememberMe);

          // JWTからユーザーIDを取得
          const payload = JSON.parse(atob(idToken.split(".")[1]));
          const userId = payload.sub;

          // ストアに保存
          signInUserStore.setUserId(userId);

          // ホームページへ遷移
          router.push("/orders");
        }
      } catch (err) {
        console.error('Auto login failed:', err);
        // 自動ログインに失敗した場合は、ローカルストレージをクリア
        authStore.clearAuth();
        signInUserStore.clear();
      }
    };

    tryAutoLogin();
  }, [router]);

  // エラーをリセット
  const resetErrors = () => {
    setValidateEmailError("");
    setValidatePasswordError("");
    setValidateVerificationCodeError("");
    setSignUpError("");
    setSignInError("");
  };

  // メールアドレスのバリデーション
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 6桁の数字のバリデーション
  const isValidVerificationCode = (verificationCode: string) => {
    return /^[0-9]{6}$/.test(verificationCode);
  };

  // サインアップ時の入力のバリデーション
  const handleValidateSignUp = () => {
    if (!email) {
      setValidateEmailError("Please enter your email");
    }
    if (!password) {
      setValidatePasswordError("Please enter your password");
      return false;
    }
    if (password !== confirmPassword) {
      setValidatePasswordError("Password does not match");
      return false;
    }
    if (!isValidEmail(email)) {
      setValidateEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // サインイン時の入力のバリデーション
  const handleValidateSignIn = () => {
    if (!email) {
      setValidateEmailError("Please enter your email");
    }
    if (!password) {
      setValidatePasswordError("Please enter your password");
      return false;
    }
    if (!isValidEmail(email)) {
      setValidateEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // サインアップ処理
  const handleSignUp = async () => {
    try {
      setLoading(true);
      resetErrors();

      if (!handleValidateSignUp()) {
        return;
      }

      await signUp(email, password);
      setIsEmailSent(true);
    } catch (err) {
      setSignUpError(err instanceof Error ? err.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  // 検証処理
  const handleVerify = async () => {
    try {
      setLoading(true);
      resetErrors();

      // バリデーション
      if (!isValidVerificationCode(verificationCode)) {
        throw new Error('Verification code must be 6 digits');
      }

      // 古いユーザー情報をクリア
      authStore.clearAuth();
      signInUserStore.clear();

      // 検証
      await confirmSignUp(email, verificationCode);

      // 検証成功後、自動的にサインイン
      const { idToken, refreshToken } = await signIn(email, password);

      // ストアに保存
      authStore.setAuth(idToken, refreshToken, rememberMe);

      // JWTからユーザーIDを取得
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const userId = payload.sub;

      // ストアに保存
      signInUserStore.setUserId(userId);

      // 初回ステップへ遷移
      router.push(`/profile?id=${userId}`);
    } catch (err) {
      setValidateVerificationCodeError(err instanceof Error ? err.message : "Failed to verify");
    } finally {
      setLoading(false);
    }
  };

  // サインイン処理
  const handleSignIn = async () => {
    try {
      setLoading(true);
      resetErrors();

      // バリデーション
      if (!handleValidateSignIn()) {
        return;
      }

      // 古いユーザー情報をクリア
      authStore.clearAuth();
      signInUserStore.clear();

      // サインイン
      const { idToken, refreshToken } = await signIn(email, password);

      // ストアに保存
      authStore.setAuth(idToken, refreshToken, rememberMe);

      // JWTからユーザーIDを取得
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const userId = payload.sub;

      // ストアに保存
      signInUserStore.setUserId(userId);

      // ホームページへ遷移
      router.push("/orders");
    } catch (err) {
      console.error(err);
      setSignInError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  // パスワードリセット処理
  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      resetErrors();

      if (!email) {
        setValidateEmailError("Please enter your email address");
        return;
      }

      if (!isValidEmail(email)) {
        setValidateEmailError("Please enter a valid email address");
        return;
      }

      await forgotPassword(email);
      setIsEmailSent(true);
    } catch (err) {
      setSignInError(err instanceof Error ? err.message : "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  // パスワードリセット確認処理
  const handleConfirmForgotPassword = async () => {
    try {
      setLoading(true);
      resetErrors();

      if (!verificationCode || !newPassword || !confirmNewPassword) {
        setValidatePasswordError("Please fill in all fields");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setValidatePasswordError("Passwords do not match");
        return;
      }

      if (!isValidVerificationCode(verificationCode)) {
        setValidateVerificationCodeError("Verification code must be 6 digits");
        return;
      }

      await confirmForgotPassword(email, verificationCode, newPassword);

      // パスワードリセット後、自動的にサインイン
      const { idToken, refreshToken } = await signIn(email, newPassword);

      // ストアに保存
      authStore.setAuth(idToken, refreshToken, rememberMe);

      // JWTからユーザーIDを取得
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const userId = payload.sub;

      // ストアに保存
      signInUserStore.setUserId(userId);

      // ホームページへ遷移
      router.push("/orders");
    } catch (err) {
      setSignInError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // タブの状態を更新
  const callBackUpdateTabState = (state: string) => {
    setTabState(state);
    resetErrors();
    setIsForgotPassword(false);
    setIsEmailSent(false);
  };

  const tabs = ["Sign up", "Sign in"];

  const isSignUp = tabState === "Sign up";
  const isSignIn = tabState === "Sign in";

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        {/* ロゴ */}
        <div className="absolute top-8 left-16">
          <img
            alt="Floor Studios"
            src="/FloorStudios.png"
            className="h-4 w-auto"
          />
        </div>
        
        <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
          {!isForgotPassword && (
            <Tabs tabs={tabs} state={tabState} callBackUpdateState={callBackUpdateTabState} />
          )}
          <div>
            {isSignUp && <h2 className="mt-4 text-2xl/9 font-bold tracking-tight text-gray-900 text-center">Create an account</h2>}
            {isSignIn && !isForgotPassword && <h2 className="mt-4 text-2xl/9 font-bold tracking-tight text-gray-900 text-center">Sign in to your account</h2>}
            {isSignIn && isForgotPassword && <h2 className="mt-4 text-2xl/9 font-bold tracking-tight text-gray-900 text-center">Reset Password</h2>}
          </div>
          <div className="mt-2">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateEmailError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                      } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isEmailSent}
                  />
                  {validateEmailError && <div className="text-sm/6 text-red-500">{validateEmailError}</div>}
                </div>
              </div>

              {!isForgotPassword && (
                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validatePasswordError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && isSignIn) {
                          handleSignIn();
                        }
                      }}
                      disabled={isEmailSent}
                    />
                    {isSignIn && validatePasswordError && <div className="text-sm/6 text-red-500">{validatePasswordError}</div>}
                  </div>
                </div>
              )}

              {isSignUp && !isEmailSent && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      autoComplete="current-password"
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validatePasswordError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSignUp();
                        }
                      }}
                      disabled={isEmailSent}
                    />
                    {validatePasswordError && <div className="text-sm/6 text-red-500">{validatePasswordError}</div>}
                  </div>
                </div>
              )}

              {(isSignUp || isForgotPassword) && isEmailSent && (
                <div>
                  <label htmlFor="verificationCode" className="block text-sm/6 font-medium text-gray-900">
                    Verification code
                  </label>
                  <div className="mt-2">
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      required
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateVerificationCodeError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (isForgotPassword) {
                            handleConfirmForgotPassword();
                          } else {
                            handleVerify();
                          }
                        }
                      }}
                    />
                    {validateVerificationCodeError && <div className="text-sm/6 text-red-500">{validateVerificationCodeError}</div>}
                  </div>
                </div>
              )}

              {isForgotPassword && isEmailSent && (
                <>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm/6 font-medium text-gray-900">
                      New password
                    </label>
                    <div className="mt-2">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validatePasswordError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmNewPassword" className="block text-sm/6 font-medium text-gray-900">
                      Confirm new password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        required
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validatePasswordError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between">
                {!isForgotPassword && (
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                      Remember me
                    </label>
                  </div>
                )}

                {isSignIn && !isForgotPassword && (
                  <div className="text-sm/6">
                    <button
                      onClick={() => {
                        setIsForgotPassword(true);
                        resetErrors();
                      }}
                      className="font-semibold text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              {/* サインアップボタン */}
              {isSignUp && !isEmailSent && (
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    disabled={loading}
                    onClick={handleSignUp}
                  >
                    {loading ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              )}

              {/* 検証ボタン */}
              {isSignUp && isEmailSent && (
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    disabled={loading}
                    onClick={handleVerify}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              )}

              {/* サインインボタン */}
              {isSignIn && !isForgotPassword && (
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    disabled={loading}
                    onClick={handleSignIn}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              )}

              {/* パスワードリセットボタン */}
              {isSignIn && isForgotPassword && !isEmailSent && (
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    disabled={loading}
                    onClick={handleForgotPassword}
                  >
                    {loading ? "Sending..." : "Send reset code"}
                  </button>
                </div>
              )}

              {/* パスワードリセット確認ボタン */}
              {isSignIn && isForgotPassword && isEmailSent && (
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    disabled={loading}
                    onClick={handleConfirmForgotPassword}
                  >
                    {loading ? "Processing..." : "Reset password"}
                  </button>
                </div>
              )}

              {/* エラーメッセージ */}
              {signUpError && <div className="flex items-center justify-center">
                <div className="text-sm/6 text-red-500">{signUpError}</div>
              </div>}
              {validateVerificationCodeError && <div className="flex items-center justify-center">
                <div className="text-sm/6 text-red-500">{validateVerificationCodeError}</div>
              </div>}
              {signInError && <div className="flex items-center justify-center">
                <div className="text-sm/6 text-red-500">{signInError}</div>
              </div>}

              {/* パスワードリセットから戻るリンク */}
              {isSignIn && isForgotPassword && (
                <div className="text-sm/6 text-center">
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setIsEmailSent(false);
                      resetErrors();
                    }}
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Back to sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </>
  );
});

export default Home;
