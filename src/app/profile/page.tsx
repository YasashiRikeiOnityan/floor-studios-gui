"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { signInUserStore } from "@/stores/signInUserStore";
import { User } from "@/lib/type";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

const Profile = observer(() => {

  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [validateNameError, setValidateNameError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await signInUserStore.getUserFromApi();
      setUser(user);
      setUserName(user.userName || "");

    }
    getUser();
  }, []);

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

  const handleSave = () => {
    if (!handleValidateName()) {
      return;
    }
  }

  return (
    <>
      <div className="min-h-full">
        <Header current="Profile" />
        <div className="py-5 sm:py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-y-3 items-end">
                <Button
                  type={"button"}
                  onClick={() => {handleEdit()}}
                  text={"Edit"}
                  style={"text"}
                  fullWidth={false}
                />
              </div>
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {/* ユーザー名 */}
                  {!isEditing && <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">User Name</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {signInUserStore.isLoading ? <Loading /> : user?.userName || ""}
                    </dd>
                  </div>}
                  {isEditing && <div className="px-4 py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">User Name</dt>
                    <div>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                          validateNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                      />
                      {validateNameError && <div className="text-sm/6 text-red-500">{validateNameError}</div>}
                    </div>
                  </div>}
                  {/* メールアドレス */}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {signInUserStore.isLoading ? <Loading /> : user?.email || ""}
                    </dd>
                  </div>
                </dl>
              </div>
              {/* ボタン */}
              {isEditing && <div className="mt-6 flex flex-row gap-x-3 justify-center">
                <Button
                  type={"button"}
                  onClick={() => {setIsEditing(!isEditing)}}
                  text={"Cancel"}
                  style={"text"}
                  fullWidth={false}
                />
                <Button
                  type={"button"}
                  onClick={() => {handleSave()}}
                  text={"Save"}
                  style={"fill"}
                  fullWidth={false}
                />
              </div>}
            </div>
          </main>
        </div>
      </div>
    </>
  );
});

export default Profile;
