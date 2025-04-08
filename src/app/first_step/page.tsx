"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { signInUserStore } from "@/stores/signInUserStore";
import { useState } from "react";

const FirstStep = () => {
  const [userName, setUserName] = useState("");
  const [validateUserNameError, setValidateUserNameError] = useState("");
  const [isPuttingUserName, setIsPuttingUserName] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [validateBrandNameError, setValidateBrandNameError] = useState("");
  const [isPuttingBrandName, setIsPuttingBrandName] = useState(false);

  const handleValidateUserName = () => {
    if (userName.length === 0) {
      setValidateUserNameError("User name is required");
      return false;
    } else if (userName.length > 20) {
      setValidateUserNameError("User name must be less than 20 characters");
      return false;
    } else {
      setValidateUserNameError("");
      return true;
    }
  }

  const handleSaveUserName = async () => {
    if (!handleValidateUserName()) {
      return;
    }
    setIsPuttingUserName(true);
    await signInUserStore.putUserToApi(signInUserStore.userId, { userName: userName });
    setIsPuttingUserName(false);
  }

  const handleValidateBrandName = () => {
    if (brandName.length === 0) {
      setValidateBrandNameError("Brand name is required");
      return false;
    } else if (brandName.length > 20) {
      setValidateBrandNameError("Brand name must be less than 20 characters");
      return false;
    } else {
      setValidateBrandNameError("");
      return true;
    }
  }

  const handleSaveBrandName = async () => {
    if (!handleValidateBrandName()) {
      return;
    }
    setIsPuttingBrandName(true);
    // await signInUserStore.putUserToApi(signInUserStore.userId, { brandName: brandName });
    setIsPuttingBrandName(false);
  }
  return (
    <>
      <div className="min-h-full">
        <div className="py-5 sm:py-10">
          <PageTitle title="First Step" />
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mt-2 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {/* ユーザー名 */}
                  <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-medium text-gray-900">User Name</dt>
                    {isPuttingUserName ? <Loading /> : <div>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateUserNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                      />
                      {validateUserNameError && <div className="text-sm/6 text-red-500">{validateUserNameError}</div>}
                    </div>}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        text="Save"
                        onClick={handleSaveUserName}
                        style="fill"
                        disabled={isPuttingUserName}
                      />
                    </div>
                  </div>
                  {/* ブランド名 */}
                  <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm/6 font-medium text-gray-900">Brand Name</dt>
                    {isPuttingBrandName ? <Loading /> : <div>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateBrandNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                      />
                      {validateBrandNameError && <div className="text-sm/6 text-red-500">{validateBrandNameError}</div>}
                    </div>}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        text="Save"
                        onClick={handleSaveBrandName}
                        style="fill"
                        disabled={isPuttingBrandName}
                      />
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default FirstStep;
