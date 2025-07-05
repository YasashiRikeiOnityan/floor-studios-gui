"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { observer } from 'mobx-react-lite';
import { tenantStore } from '@/stores/tenantStore';

type TShirtFabricMaterials = {
  currentMaterial: string;
  setCurrentMaterial: (rowMaterial: string) => void;
  fullWidth?: boolean;
}

const TShirtFabricMaterials = observer((props: TShirtFabricMaterials) => {

  const materials = [...tenantStore.tenantSettingsTShirtFabric.materials, { rowMaterial: "Other" }];

  const currentMaterial = materials.find(material => material.rowMaterial === props.currentMaterial) || (props.currentMaterial === "" ? materials[0] : { rowMaterial: "Other" });

  return (
    <Listbox value={currentMaterial.rowMaterial} onChange={(value) => props.setCurrentMaterial(value)} as="div" className="relative">
      <ListboxButton className={`grid ${props.fullWidth ? "w-full" : "w-80"} cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}>
        <span className="col-start-1 row-start-1 truncate pr-6">{currentMaterial?.rowMaterial}</span>
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
        {materials.map((material) => (
          <ListboxOption
            key={material.rowMaterial}
            value={material.rowMaterial}
            className={`group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none
              ${material.rowMaterial === props.currentMaterial ? 'bg-blue-50' : ''}`}
          >
            <span className="block truncate font-normal group-data-[selected]:font-semibold">{material.rowMaterial}</span>
            {material.rowMaterial === props.currentMaterial && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
});

export default TShirtFabricMaterials;
