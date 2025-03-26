"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";
import { signIn } from "../lib/cognito";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUserStore } from "@/stores/signInUserStore";

const Home = observer(() => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validateEmailError, setValidateEmailError] = useState("");
  const [validatePasswordError, setValidatePasswordError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // メールアドレスのバリデーション
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 入力のバリデーション
  const handleValidate = () => {
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
      // ステートをリセット
      setLoading(true);
      setValidateEmailError("");
      setValidatePasswordError("");
      setSignInError("");

      // バリデーション
      if (!handleValidate()) {
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

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Floor Studios"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSignIn();
                          }
                        }}
                      />
                      {validatePasswordError && <div className="text-sm/6 text-red-500">{validatePasswordError}</div>}
                    </div>
                  </div>

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

                    <div className="text-sm/6">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {/* サインインボタン */}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading}
                      onClick={handleSignIn}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>

                  {/* エラーメッセージ */}
                  {signInError && <div className="flex items-center justify-center">
                    <div className="text-sm/6 text-red-500">{signInError}</div>
                  </div>}

                  {/* サインアップリンク */}
                  <div className="flex items-center justify-end">
                    <a href="signup" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">Create an account</a>
                  </div>
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
