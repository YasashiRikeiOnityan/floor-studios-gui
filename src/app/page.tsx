"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";
import { confirmSignUp, signIn, signUp } from "../lib/cognito";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUserStore } from "@/stores/signInUserStore";
import Tabs from "@/components/Tabs";

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

  // 入力のバリデーション
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

  const handleSignIn = async () => {
    try {
      setLoading(true);
      resetErrors();

      // バリデーション
      if (!handleValidateSignIn()) {
        return;
      }

      // サインイン
      const { idToken } = await signIn(email, password);
      
      // ストアに保存
      authStore.setAuth(idToken, rememberMe);
      
      // JWTからユーザーIDを取得
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const userId = payload.sub;

      // ストアに保存
      signInUserStore.setUserId(userId);
      
      // ホームページへ遷移
      router.push("/home");
    } catch (err) {
      console.error(err);
      setSignInError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

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

  const handleVerify = async () => {
    try {
      setLoading(true);
      resetErrors();

      if (!isValidVerificationCode(verificationCode)) {
        throw new Error('Verification code must be 6 digits');
      }

      await confirmSignUp(email, verificationCode);

      // ホームページへ遷移
      router.push('/home');
    } catch (err) {
      setValidateVerificationCodeError(err instanceof Error ? err.message : 'Failed to verify');
    } finally {
      setLoading(false);
    }
  };

  const callBackUpdateTabState = (state: string) => {
    setTabState(state);
    resetErrors();
  };

  const tabs = ["Sign up", "Sign in"];

  const isSignUp = tabState === "Sign up";
  const isSignIn = tabState === "Sign in";

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-start mt-40 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <Tabs tabs={tabs} state={tabState} callBackUpdateState={callBackUpdateTabState} />
          <div className="mt-8 mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <img
                alt="Floor Studios"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              /> */}
              {isSignUp && <h2 className="mt-4 text-2xl/9 font-bold tracking-tight text-gray-900">Create an account</h2>}
              {isSignIn && <h2 className="mt-4 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>}
            </div>

            <div className="mt-10">
              <div>
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
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                            validateEmailError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                         } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isEmailSent}
                      />
                      {validateEmailError && <div className="text-sm/6 text-red-500">{validateEmailError}</div>}
                    </div>
                  </div>

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
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                          validatePasswordError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isEmailSent}
                      />
                      {isSignIn && validatePasswordError && <div className="text-sm/6 text-red-500">{validatePasswordError}</div>}
                    </div>
                  </div>

                  {isSignUp && <div>
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
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                          validatePasswordError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
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
                  </div>}

                  {isSignUp && isEmailSent && <div>
                    <label htmlFor="verificationCode" className={"block text-sm/6 font-medium text-gray-900"}>
                      Verification code
                    </label>
                    <div className="mt-2">
                      <input
                        id="verificationCode"
                        name="verificationCode"
                        type="text"
                        required
                        autoComplete="verificationCode"
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                            validateVerificationCodeError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                         } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleVerify();
                          }
                        }}
                      />
                      {validateVerificationCodeError && <div className="text-sm/6 text-red-500">{validateVerificationCodeError}</div>}
                    </div>
                  </div>}

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
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

                    {isSignIn && <div className="text-sm/6">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>}
                  </div>

                  {/* サインアップボタン */}
                  {isSignUp && !isEmailSent && <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading}
                      onClick={handleSignUp}
                    >
                      {loading ? "Signing up..." : "Sign up"}
                    </button>
                  </div>}

                  {/* 検証ボタン */}
                  {isSignUp && isEmailSent && <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading}
                      onClick={handleVerify}
                    >
                      {loading ? "Verifying..." : "Verify"}
                    </button>
                  </div>}

                  {/* サインインボタン */}
                  {isSignIn && <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading}
                      onClick={handleSignIn}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>}

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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 画像 */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  );
});

export default Home;
