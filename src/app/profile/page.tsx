"use client";

import Header from "@/components/Header";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ApiGetUsers } from "@/lib/api";

const Profile = observer(() => {
  useEffect(() => {
    // const userId = "87a41a28-3071-7025-ef9a-ae6281d3dd4c";
    // userStore.fetchUser(userId);
    ApiGetUsers();
  }, []);

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
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Floor Studios</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">floor-studios@example.com</dd>
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
