"use client";

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { signUp, confirmSignUp } from '@/lib/cognito';
import { useRouter } from 'next/navigation';

const SignUp = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [validateErrorEmail, setValidateErrorEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setValidateErrorEmail('メールアドレスを入力してください');
      return false;
    }
    if (!emailRegex.test(email)) {
      setValidateErrorEmail('有効なメールアドレスを入力してください');
      return false;
    }
    setValidateErrorEmail('');
    return true;
  };

  const handleSendVerificationCode = async () => {
    try {
      setError('');
      setIsLoading(true);

      if (!validateEmail(email)) {
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        throw new Error('パスワードが一致しません');
      }

      if (password.length < 8) {
        throw new Error('パスワードは8文字以上で入力してください');
      }

      await signUp(email, password);
      setIsEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検証コードの送信に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      setError('');
      setIsLoading(true);

      if (verificationCode.length !== 6) {
        throw new Error('検証コードは6桁で入力してください');
      }

      await confirmSignUp(email, verificationCode);
      router.push('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  validateErrorEmail ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="メールアドレス"
                disabled={isEmailSent}
              />
              {validateErrorEmail && (
                <p className="mt-1 text-sm text-red-600">{validateErrorEmail}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
                disabled={isEmailSent}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                パスワード（確認）
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（確認）"
                disabled={isEmailSent}
              />
            </div>
            {isEmailSent && (
              <div>
                <label htmlFor="verification-code" className="sr-only">
                  検証コード
                </label>
                <input
                  id="verification-code"
                  name="verification-code"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="検証コード（6桁）"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            {!isEmailSent ? (
              <button
                type="button"
                onClick={handleSendVerificationCode}
                disabled={isLoading || !!validateErrorEmail}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? '送信中...' : '検証コードを送信'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmSignUp}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? '登録中...' : '登録する'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});

export default SignUp;
