import { specificationStore } from '@/stores/specificationStore';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

type SpecificationMenuProps = {
  specificationId: string;
}

const SpecificationMenu = (props: SpecificationMenuProps) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex h-8 w-8 max-w-xs items-center justify-center rounded-full bg-white text-sm hover:bg-gray-100 hover:cursor-pointer">
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 sm:left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 overflow-visible focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={() => {}}
          >
            Details
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={() => {}}
          >
            Edit
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={() => {}}
          >
            Download
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="block px-4 py-2 text-sm text-red-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={() => {
              // アラートダイアログを表示する
              specificationStore.deleteSpecificationsSpecificationsId(props.specificationId);
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
