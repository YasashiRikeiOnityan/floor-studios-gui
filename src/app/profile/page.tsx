"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { signInUserStore } from "@/stores/signInUserStore";
import { User } from "@/lib/type";

const Profile = observer(() => {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const user = await signInUserStore.getUserFromApi();
      setUser(user);
    }
    getUser();
  }, []);

  console.log("Profile", signInUserStore.getUserId());

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
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Brand name</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Floor Studios</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">User Name</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.userName || ""}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.email || ""}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
});

export default Profile;
