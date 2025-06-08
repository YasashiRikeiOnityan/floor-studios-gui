"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Loading from "@/components/Loading";
import { specificationGroupsStore } from "@/stores/specificationGroupsStore";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AlertDialog from "@/components/AlertDialod";
import { dialogStore } from "@/stores/dialogStore";
import Button from "@/components/Button";

const SpecificationGroupsCards = observer(() => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [editValue, setEditValue] = useState<string>("");
  const [validateSpecificationGroupName, setValidateSpecificationGroupName] = useState(false);
  const [savingId, setSavingId] = useState<string | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getSpecificationGroups = async () => {
      if (mounted) {
        setLoading(true);
        await specificationGroupsStore.getSpecificationGroups();
        setLoading(false);
      }
    };
    getSpecificationGroups();
  }, [mounted]);

  const handleEditSave = async (id: string) => {
    setSavingId(id);
    await specificationGroupsStore.putSpecificationGroupName(id, editValue);
    setSavingId(undefined);
    setEditingId(undefined);
  };

  const handleDelete = (id: string) => {
    dialogStore.openAlertDialog(
      "Delete Collection",
      "Are you sure you want to delete this collection? This action cannot be undone.",
      "Delete",
      false,
      async () => {
        setDeletingId(id);
        dialogStore.closeAlertDialog();
        await specificationGroupsStore.deleteSpecificationGroupName(id);
        setDeletingId(undefined);
      }
    )
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {specificationGroupsStore.specificationGroups.map((specificationGroup) => (
        <div
          key={specificationGroup.specificationGroupId}
          className="rounded-lg bg-white shadow-md mb-4 h-30"
        >
          <div className="p-4 flex flex-col justify-between h-full">
            {editingId === specificationGroup.specificationGroupId ? (
              <input
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${validateSpecificationGroupName ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'
                  } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditSave(specificationGroup.specificationGroupId);
                  }
                }}
                autoFocus
              />
            ) : (
              specificationGroup.specificationGroupName
            )}
            <div className="flex items-center justify-between gap-2">
              {editingId === specificationGroup.specificationGroupId ?
                (savingId === specificationGroup.specificationGroupId ?
                  <Loading /> :
                  <Button
                    type={"button"}
                    style={"fill"}
                    text={"Save"}
                    onClick={() => handleEditSave(specificationGroup.specificationGroupId)}
                  />) :
                <div></div>}
              <div className="flex items-center gap-2">
                <button
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={() => {
                    if (editingId === specificationGroup.specificationGroupId) {
                      setEditingId(undefined);
                    } else {
                      setEditingId(specificationGroup.specificationGroupId);
                      setEditValue(specificationGroup.specificationGroupName);
                      setValidateSpecificationGroupName(false);
                    }
                  }}
                  aria-label="Edit"
                >
                  <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  className="p-1 rounded hover:bg-red-100"
                  onClick={() => handleDelete(specificationGroup.specificationGroupId)}
                  aria-label="Delete"
                  disabled={deletingId === specificationGroup.specificationGroupId}
                >
                  {deletingId === specificationGroup.specificationGroupId ? (
                    <Loading />
                  ) : (
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AlertDialog />
    </>
  );
});

export default SpecificationGroupsCards;
