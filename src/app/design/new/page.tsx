"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import SpecificationGroups from "@/components/SpecificationGroups";
import { specificationStore } from "@/stores/specificationStore";
import { tenantStore } from "@/stores/tenantStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { useState } from "react";


const NewDesign = observer(() => {
  const router = useRouter();

  const [brandName, setBrandName] = useState(tenantStore.tenant.tenantName);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [specificationGroupId, setSpecificationGroupId] = useState("NO_GROUP");

  // 作成ボタンのクリック時の処理
  const handleCreateAndNext = async () => {
    const id = await specificationStore.postSpecifications(brandName, productName, productCode, specificationGroupId);
    router.push(`/design/edit?id=${id}`);
  };

  // キャンセルボタンのクリック時の処理
  const handleCancel = () => {
    router.push("/orders");
  };

  return (
    <>
      <div className="min-h-full">
        <Header current="" />
        <div className="mt-16 py-5 sm:py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-gray-900">New Design</h1>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <form>
              <div className="space-y-12">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                  <div>
                    <h2 className="text-base/7 font-semibold text-gray-900">Product Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                      Enter the product information.
                    </p>
                  </div>

                  {/* 商品情報 */}
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

                    {/* ブランド名 */}
                    <div className="sm:col-span-4">
                      <label htmlFor="brandname" className="block text-sm/6 font-medium text-gray-900">
                        Brand Name
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                          <input
                            id="brandname"
                            name="brandname"
                            type="text"
                            placeholder="Floor Studios"
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 商品名 */}
                    <div className="sm:col-span-4">
                      <label htmlFor="productname" className="block text-sm/6 font-medium text-gray-900">
                        Product Name
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                          <input
                            id="productname"
                            name="productname"
                            type="text"
                            placeholder=""
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 商品コード */}
                    <div className="sm:col-span-4">
                      <label htmlFor="productcode" className="block text-sm/6 font-medium text-gray-900">
                        Product Code
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                          <input
                            id="productcode"
                            name="productcode"
                            type="text"
                            placeholder=""
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* コレクション名 */}
                    <div className="sm:col-span-4">
                      <label htmlFor="collection" className="block text-sm/6 font-medium text-gray-900">
                        Collection
                      </label>
                      <div className="mt-2">
                        <SpecificationGroups currentSpecificationGroupId={specificationGroupId} setCurrentSpecificationGroupId={setSpecificationGroupId} fullWidth={true} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  type="button"
                  onClick={handleCancel}
                  text={"Cancel"}
                  style={"text"}
                  fullWidth={false}
                  disabled={specificationStore.loading}
                />
                <Button
                  type="submit"
                  onClick={handleCreateAndNext}
                  text={"Create and Next"}
                  style={"fill"}
                  fullWidth={false}
                  disabled={specificationStore.loading}
                />
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
});

export default NewDesign;
