"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import SpecificationGroups from "@/components/SpecificationGroups";
import { specificationStore } from "@/stores/specificationStore";
import { tenantStore } from "@/stores/tenantStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState, Suspense, useRef, useEffect } from "react";
import Types from "@/components/Types";
import { SpecificationType } from "@/lib/type/specification/type";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";


const NewDesignContent = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  
  const [brandName, setBrandName] = useState(tenantStore.tenant.tenantName);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [specificationGroupId, setSpecificationGroupId] = useState(collectionParam || "NO_GROUP");
  const [validateBrandNameError, setValidateBrandNameError] = useState("");
  const [validateProductNameError, setValidateProductNameError] = useState("");
  const [validateProductCodeError, setValidateProductCodeError] = useState("");
  const [currentType, setCurrentType] = useState<SpecificationType>(undefined);

  // エラーメッセージが設定された時にスクロールする
  useEffect(() => {
    if (validateBrandNameError || validateProductNameError || validateProductCodeError) {
      setTimeout(() => scrollToError(), 100);
    }
  }, [validateBrandNameError, validateProductNameError, validateProductCodeError]);

  // 各入力フィールドへの参照を作成（useStateの直後に配置）
  const brandNameRef = useRef<HTMLInputElement>(null);
  const productNameRef = useRef<HTMLInputElement>(null);
  const productCodeRef = useRef<HTMLInputElement>(null);

  // エラーがある要素までスクロールする関数
  const scrollToError = () => {
    if (validateBrandNameError && brandNameRef.current) {
      brandNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (validateProductNameError && productNameRef.current) {
      productNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (validateProductCodeError && productCodeRef.current) {
      productCodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  };

  const handleCreateAndNext = async () => {
    if (!handleValidate()) {
      return;
    } else {
      const id = await specificationStore.postSpecifications({
        brand_name: brandName,
        product_name: productName,
        product_code: productCode,
        specification_group_id: specificationGroupId,
        type: currentType,
        status: "DRAFT",
        progress: "BASICINFORMATION",
      });
      router.push(`/design/edit?id=${id}`);
    }
  };

  const handleCancel = () => {
    router.push("/orders");
  };

  const handleValidate = () => {
    setValidateBrandNameError("");
    setValidateProductNameError("");
    setValidateProductCodeError("");
    if (brandName.length < 1 || brandName.length > 50) {
      setValidateBrandNameError("Brand Name is required and must be less than 40 characters");
      return false;
    }
    if (productName.length < 1 || productName.length > 50) {
      setValidateProductNameError("Product Name is required and must be less than 40 characters");
      return false;
    }
    if (productCode.length < 1 || productCode.length > 50) {
      setValidateProductCodeError("Product Code is required and must be less than 40 characters");
      return false;
    }
    return true;
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
                  <div className="sm:col-span-3">
                    <label htmlFor="brandname" className="block text-sm/6 font-medium text-gray-900">
                      Brand Name
                    </label>
                    <div className="mt-2">
                      <input
                        ref={brandNameRef}
                        id="brandname"
                        name="brandname"
                        type="text"
                        placeholder="Floor Studios"
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateBrandNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                      {validateBrandNameError && <div className="text-sm/6 text-red-500">{validateBrandNameError}</div>}
                    </div>
                  </div>

                  {/* コレクション名 */}
                  <div className="sm:col-span-3">
                    <label htmlFor="collection" className="block text-sm/6 font-medium text-gray-900">
                      Collection
                    </label>
                    <div className="mt-2">
                      <SpecificationGroups currentSpecificationGroupId={specificationGroupId} setCurrentSpecificationGroupId={setSpecificationGroupId} fullWidth={true} />
                    </div>
                  </div>

                  {/* 商品名 */}
                  <div className="sm:col-span-3">
                    <label htmlFor="productname" className="block text-sm/6 font-medium text-gray-900">
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        ref={productNameRef}
                        id="productname"
                        name="productname"
                        type="text"
                        placeholder=""
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateProductNameError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                      {validateProductNameError && <div className="text-sm/6 text-red-500">{validateProductNameError}</div>}
                    </div>
                  </div>

                  {/* 商品コード */}
                  <div className="sm:col-span-3">
                    <label htmlFor="productcode" className="block text-sm/6 font-medium text-gray-900">
                      Product Code
                    </label>
                    <div className="mt-2">
                      <input
                        ref={productCodeRef}
                        id="productcode"
                        name="productcode"
                        type="text"
                        placeholder=""
                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateProductCodeError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                      />
                      {validateProductCodeError && <div className="text-sm/6 text-red-500">{validateProductCodeError}</div>}
                    </div>
                  </div>

                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
                <div>
                  <h2 className="text-base/7 font-semibold text-gray-900">Product Type</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    What would you like to design?
                  </p>
                </div>
               <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 md:col-span-2">
                  <Types currentType={currentType} callBackUpdateState={(type) => setCurrentType(type)} disabled={false} />
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
                disabled={false}
              />
              <Button
                type="button"
                onClick={handleCreateAndNext}
                text={"Create and Next"}
                style={"fill"}
                fullWidth={false}
                disabled={false}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
});

const NewDesign = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NewDesignContent />
    </Suspense>
  );
};

export default NewDesign;
