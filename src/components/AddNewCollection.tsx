"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { specificationGroupsStore } from "@/stores/specificationGroupsStore";

type AddNewCollectionProps = {
  isOpen: boolean;
  close: () => void;
};

const AddNewCollection = (props: AddNewCollectionProps) => {
  const [collectionName, setCollectionName] = useState("");
  const [validateError, setValidateError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (collectionName.length < 1 || collectionName.length > 20) {
      setValidateError("Collection Name is required and must be less than 20 characters");
      return;
    }
    setIsLoading(true);
    await specificationGroupsStore.postSpecificationGroups(collectionName);
    setIsLoading(false);
    handleCancel();
  }

  const handleCancel = () => {
    setCollectionName("");
    setValidateError("");
    props.close();
  }

  return (
    <Dialog open={props.isOpen} onClose={props.close} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-[101] w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Name your collection
                </DialogTitle>
                <div className="mt-4">
                  <label htmlFor="collectionname" className="block text-sm/6 font-medium text-gray-900">
                    Collection Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="collectionname"
                      name="collectionname"
                      type="text"
                      placeholder=""
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${
                        validateError ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                      } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                    {validateError && <div className="text-sm/6 text-red-500 mt-1">{validateError}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="button"
                onClick={handleSave}
                style="fill"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                data-autofocus
                onClick={handleCancel}
                style="text"
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddNewCollection;
