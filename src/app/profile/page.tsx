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
import PageTitle from "@/components/PageTitle";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const ProfileContent = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id") || "";

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [validateNameError, setValidateNameError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (mounted && userId) {
        const user = await signInUserStore.fetchUser(userId);
        setUser(user);
        setUserName(user.userName || "");
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
      <div className="mt-16 py-5 sm:py-10">
        <PageTitle title="Profile" />
        <main>
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-y-3 items-end">
              <button
                className="relative group p-1 rounded hover:bg-gray-100"
                onClick={() => handleEdit()}
                aria-label="Edit"
              >
                <PencilSquareIcon className={`h-5 w-5 ${isEditing ? "text-blue-500" : "text-gray-500"}`} />
                <span className="w-[48px] py-1 invisible rounded text-[12px] font-bold text-white bg-gray-700 -top-8 -left-2.5 group-hover:visible hover:opacity-100 absolute">
                  Edit
                </span>
              </button>
            </div>
            <div className="mt-2">
              <dl className="divide-y divide-gray-100">
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
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
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
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user?.email || ""}
                  </dd>
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
};

const Profile = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent />
    </Suspense>
  );
};

export default observer(Profile);
