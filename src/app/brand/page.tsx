"use client";

import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import AlertDialog from "@/components/AlertDialod";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { tenantStore } from "@/stores/tenantStore";

const Brand = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [tenantName, setTenantName] = useState(tenantStore?.tenant?.tenantName || "");
  const [validateNameError, setValidateNameError] = useState("");
  const [billingInfoName, setBillingInfoName] = useState(tenantStore?.tenant?.billingInfo?.name || "");
  const [billingInfoAddress, setBillingInfoAddress] = useState(tenantStore?.tenant?.billingInfo?.address || "");

  useEffect(() => {
    const fetchTenant = async () => {
      const tenant = await tenantStore.fetchTenant();
      setTenantName(tenant?.tenantName || "");
      setBillingInfoName(tenant?.billingInfo?.name || "");
      setBillingInfoAddress(tenant?.billingInfo?.address || "");
    }
    fetchTenant();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  const validateName = () => {
    if (tenantName.length === 0) {
      setValidateNameError("Brand name is required");
      return false;
    } else if (tenantName.length > 20) {
      setValidateNameError("Brand name must be less than 20 characters");
      return false;
    } else {
      setValidateNameError("");
      return true;
    }
  }

  const handleSave = () => {
    if (!validateName()) {
      return;
    }
    tenantStore.putTenant({
      tenantId: tenantStore.tenant?.tenantId || "",
      tenantName: tenantName,
      billingInfo: {
        name: billingInfoName,
        address: billingInfoAddress,
      },
    });
    setIsEditing(false);
  }

  return (
    <>
      <div className="min-h-full">
        <Header current="Brand" />
        <div className="py-5 sm:py-10">
          <PageTitle title="Brand" />
          <main>
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-y-3 items-end">
              <Button
                type={"button"}
                onClick={handleEdit}
                text={"Edit"}
                style={"text"}
                fullWidth={false}
              />
            </div>
            <div className="mt-2 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {/* ユーザー名 */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Brand Name</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {tenantStore.loading ? <Loading /> : tenantStore?.tenant?.tenantName || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Brand Name</dt>
                  <div>
                    <input
                      type="text"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                    />
                    {validateNameError && <div className="text-sm/6 text-red-500">{validateNameError}</div>}
                  </div>
                </div>}
                {/* 請求先名 */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Billing Info Name</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {tenantStore.loading ? <Loading /> : tenantStore?.tenant?.billingInfo?.name || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Billing Info Name</dt>
                  <div>
                    <input
                      type="text"
                      value={billingInfoName}
                      onChange={(e) => setBillingInfoName(e.target.value)}
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                    />
                  </div>
                </div>}
                {/* 請求先住所 */}
                {!isEditing && <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Billing Address</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {tenantStore.loading ? <Loading /> : tenantStore.tenant.billingInfo.address || ""}
                  </dd>
                </div>}
                {isEditing && <div className="py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm/6 font-medium text-gray-900">Billing Address</dt>
                  <div>
                    <textarea
                      rows={4}
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                      } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                      value={billingInfoAddress}
                      onChange={(e) => setBillingInfoAddress(e.target.value)}
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
                onClick={handleSave}
                text={"Save"}
                style={"fill"}
                fullWidth={false}
              />
            </div>}
          </div>
        </main>
        </div>
        <AlertDialog />
      </div>
    </>
  )
});

export default Brand;
