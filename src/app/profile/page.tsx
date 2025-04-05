"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { signInUserStore } from "@/stores/signInUserStore";
import { User } from "@/lib/type";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const ProfileContent = observer(() => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const userId = searchParams.get("user_id") || "";

  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [validateNameError, setValidateNameError] = useState("");
  const [timezone, setTimeZone] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (mounted && userId) {
        const user = await signInUserStore.getUserFromApi(userId);
        setUser(user);
        setUserName(user.userName || "");
        setTimeZone(user.timezone || "");
        setLanguage(user.language || "");
      }
    };
    getUser();
  }, [userId, mounted]);

  const handleValidateName = () => {
    if (userName.length === 0) {
      setValidateNameError("User name is required");
      return false;
    } else if (userName.length > 20) {
      setValidateNameError("User name must be less than 20 characters");
      return false;
    } else {
      setValidateNameError("");
      return true;
    }
  }

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setUserName(user?.userName || "");
      setValidateNameError("");
    } else {
      setIsEditing(false);
    }
  }

  const handleSave = async () => {
    if (!handleValidateName()) {
      return;
    }
    setIsEditing(false);
    const user = await signInUserStore.putUserToApi(userId, { userName: userName });
    setUser(user);
  }

  if (!mounted) {
    return <Loading full={true} />;
  }

  return (
    <div className="min-h-full">
      <Header current="Profile" />
      <div className="py-5 sm:py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-y-3 items-end">
              <Button
                type={"button"}
                onClick={() => { handleEdit() }}
                text={"Edit"}
                style={"text"}
                fullWidth={false}
              />
            </div>
            <div className="mt-2 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {/* プロフィール画像 */}
                {!isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Profile Image</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {signInUserStore.isLoading ? <Loading /> : 
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile Image" className="w-10 h-10 rounded-full" />}
                      {/* user?.imageUrl ? <img src={user?.imageUrl} alt="Profile Image" className="w-10 h-10 rounded-full" /> : <>no image</>} */}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Profile Image</dt>
                  <div>
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile Image" className="w-10 h-10 rounded-full" />
                    {/* user?.imageUrl ? <img src={user?.imageUrl} alt="Profile Image" className="w-10 h-10 rounded-full" /> : <>no image</>} */}
                  </div>
                </div>}
                {/* ユーザー名 */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">User Name</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {signInUserStore.isLoading ? <Loading /> : user?.userName || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">User Name</dt>
                  <div>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                    />
                    {validateNameError && <div className="text-sm/6 text-red-500">{validateNameError}</div>}
                  </div>
                </div>}
                {/* メールアドレス */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {signInUserStore.isLoading ? <Loading /> : user?.email || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                  <div>
                    <input
                      type="text"
                      value={user?.email || ""}
                      disabled={true}
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 order-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                    />
                    <div className="text-sm/6 text-gray-500">Email address is not editable</div>
                  </div>
                </div>}
                {/* 言語 */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Language</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {signInUserStore.isLoading ? <Loading /> : user?.language || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Language</dt>
                  <div className="grid grid-cols-1">
                    <select
                      id="language"
                      name="language"
                      value={language || ""}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>English</option>
                      <option>Japanese</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                    />
                  </div>
                </div>}
                {/* タイムゾーン */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Timezone</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {signInUserStore.isLoading ? <Loading /> : user?.timezone || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Timezone</dt>
                  <div className="grid grid-cols-1">
                    <select
                      id="timezone"
                      name="timezone"
                      value={timezone || ""}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      onChange={(e) => setTimeZone(e.target.value)}
                    >
                      <option>Pacific Standard Time</option>
                      <option>Eastern Standard Time</option>
                      <option>Greenwich Mean Time</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                    />
                  </div>
                </div>}
              </dl>
            </div>
            {/* ボタン */}
            {isEditing && <div className="mt-6 flex flex-row gap-x-3 justify-end">
              <Button
                type={"button"}
                onClick={() => { setIsEditing(!isEditing) }}
                text={"Cancel"}
                style={"text"}
                fullWidth={false}
              />
              <Button
                type={"button"}
                onClick={() => { handleSave() }}
                text={"Save"}
                style={"fill"}
                fullWidth={false}
              />
            </div>}
          </div>
        </main>
      </div>
    </div>
  );
});

const Profile = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent />
    </Suspense>
  );
};

export default Profile;
