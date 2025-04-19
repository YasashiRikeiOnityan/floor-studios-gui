import { specificationStore } from '@/stores/specificationStore';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

type SpecificationMenuProps = {
  specificationId: string;
}

const SpecificationMenu = (props: SpecificationMenuProps) => {
  const router = useRouter();

  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex h-8 w-8 max-w-xs items-center justify-center rounded-full bg-white text-sm hover:bg-gray-100 hover:cursor-pointer">
          {isDownloading ? (
            <Loading full={false} />
          ) : (
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 sm:left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 overflow-visible focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={() => { }}
          >
            Details
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={() => {
              router.push(`/design/edit?id=${props.specificationId}`);
            }}
          >
            Edit
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={async () => {
              setIsDownloading(true);
              try {
                const url = await specificationStore.getSpecificationsSpecificationIdDownload(props.specificationId);
                if (url) {
                  const a = document.createElement('a');
                  a.href = url;
                  a.click();
                }
              } finally {
                setIsDownloading(false);
              }
            }}
          >
            Download
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-red-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={async () => {
              if (window.confirm('Do you want to delete this specification?')) {
                setIsDownloading(true);
                try {
                  await specificationStore.deleteSpecificationsSpecificationsId(props.specificationId);
                } finally {
                  setIsDownloading(false);
                }
              }
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
