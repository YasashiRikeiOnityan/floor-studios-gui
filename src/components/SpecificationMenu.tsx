import { specificationStore } from '@/stores/specificationStore';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { SpecificationStatus } from '@/lib/type/specification/type';
import { notificationStore } from '@/stores/notificationStore';
import { dialogStore } from '@/stores/dialogStore';
import { PostSpecificationsSpecificationIdDuplicateInteractor } from '@/interactor/specificationsSpecificationId/duplicate/post';

type SpecificationMenuProps = {
  specificationId: string;
  specificationGroupId: string;
  status?: SpecificationStatus;
  onSpecificationDuplicated?: (specificationGroupId: string) => void;
  onSpecificationDeleted?: (specificationId: string) => void;
}

const SpecificationMenu = (props: SpecificationMenuProps) => {
  const router = useRouter();

  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const url = await specificationStore.getSpecificationsSpecificationIdDownload(props.specificationId);
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `specification-${props.specificationId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      notificationStore.addNotification("Error", "Download failed", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    try {
      await PostSpecificationsSpecificationIdDuplicateInteractor(props.specificationId);
      if (props.onSpecificationDuplicated) {
        props.onSpecificationDuplicated(props.specificationGroupId);
      }
    } catch {
      console.error("Failed to duplicate specification");
    } finally {
      setIsDuplicating(false);
    }
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex h-8 w-8 max-w-xs items-center justify-center rounded-full bg-white text-sm hover:bg-gray-100 hover:cursor-pointer">
          {isDownloading || isDeleting || isDuplicating ? (
            <Loading full={false} />
          ) : (
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 sm:left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 overflow-visible focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        modal={false}
      >
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none hover:cursor-pointer"
            onClick={() => {
              router.push(`/design/edit?id=${props.specificationId}`);
            }}
          >
            Edit
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none hover:cursor-pointer"
            onClick={handleDownload}
          >
            Download
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none hover:cursor-pointer"
            onClick={handleDuplicate}
          >
            Duplicate
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-red-700 data-[focus]:bg-gray-100 data-[focus]:outline-none hover:cursor-pointer"
            onClick={async () => {
              dialogStore.openAlertDialog("Delete Specification", "Do you want to delete this specification?", "delete", false, async () => {
                setIsDeleting(true);
                dialogStore.closeAlertDialog();
                await specificationStore.deleteSpecificationsSpecificationsId(props.specificationId);
                setIsDeleting(false);
              });
            }}
          >
            Delete
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default SpecificationMenu;
