"use client";

import { useEffect, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { observer } from 'mobx-react-lite';
import { specificationGroupsStore } from '@/stores/specificationGroupsStore';

type SpecificationGroup = {
  currentSpecificationGroupId: string;
  setCurrentSpecificationGroupId: (specificationGroupId: string) => void;
  fullWidth?: boolean;
}

const SpecificationGroups = observer((props: SpecificationGroup) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      specificationGroupsStore.getSpecificationGroups();
    }
  }, [mounted]);

  const specificationGroups = [{ specificationGroupId: "NO_GROUP", specificationGroupName: "Not Assigned to collection" }, ...specificationGroupsStore.specificationGroups];

  const currentSpecificationGroup = specificationGroups.find(specificationGroup => specificationGroup.specificationGroupId === props.currentSpecificationGroupId);

  return (
    <Listbox value={props.currentSpecificationGroupId} onChange={props.setCurrentSpecificationGroupId} as="div" className="relative">
      <ListboxButton className={`grid ${props.fullWidth ? "w-full" : "w-80"} cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}>
        <span className="col-start-1 row-start-1 truncate pr-6">{currentSpecificationGroup?.specificationGroupName}</span>
        <ChevronUpDownIcon
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </ListboxButton>

      <ListboxOptions
        transition
        className={`absolute right-0 z-10 mt-1 max-h-60 ${props.fullWidth ? "w-full" : "w-80"} overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm`}
        modal={false}
      >
        {specificationGroups.map((specificationGroup) => (
          <ListboxOption
            key={specificationGroup.specificationGroupId}
            value={specificationGroup.specificationGroupId}
            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
          >
            <span className="block truncate font-normal group-data-[selected]:font-semibold">{specificationGroup.specificationGroupName}</span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
              <CheckIcon aria-hidden="true" className="size-5" />
            </span>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
});

export default SpecificationGroups;
