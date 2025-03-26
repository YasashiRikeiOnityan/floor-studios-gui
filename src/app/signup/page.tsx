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
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendVerificationCode = async () => {
    try {
      setError('');
      setIsLoading(true);

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
            Create an account（後で整える）
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="floor-studios@example.com"
                disabled={isEmailSent}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="password"
                disabled={isEmailSent}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Password (Confirm)
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="password (confirm)"
                disabled={isEmailSent}
              />
            </div>
            {isEmailSent && (
              <div>
                <label htmlFor="verification-code" className="sr-only">
                  Verification code
                </label>
                <input
                  id="verification-code"
                  name="verification-code"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="verification code (6 digits)"
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
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send verification code'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmSignUp}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});

export default SignUp;
