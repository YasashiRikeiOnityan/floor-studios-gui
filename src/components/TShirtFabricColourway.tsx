"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { observer } from "mobx-react-lite";
import { tenantStore } from "@/stores/tenantStore";
import { Colourway } from "@/lib/type/specification/t-shirt/type";

const hexToRgb = (hex: string): string => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

type TShirtFabricColourway = {
  currentColourway: Colourway;
  setCurrentColourway: (colourway: Colourway) => void;
  fullWidth?: boolean;
}

const TShirtFabricColourway = observer((props: TShirtFabricColourway) => {

  const colourways = [...tenantStore.tenantSettingsTShirtFabric.colourways];

  const currentColourway = colourways.find(colourway => colourway.pantone === (props.currentColourway?.pantone || ""));

  return (
    <Listbox value={props.currentColourway} onChange={props.setCurrentColourway} as="div" className="relative">
      <ListboxButton
        className={`grid ${props.fullWidth ? "w-full" : "w-80"} cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6`}
      >
        <div className="flex items-center gap-x-2 col-start-1 row-start-1 truncate pr-6">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: currentColourway?.hex || "white" }}></div>
          <span>{currentColourway?.pantone}</span>
        </div>
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
        {colourways.map((colourway) => (
          <ListboxOption
            key={colourway.pantone}
            value={colourway}
            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:outline-none hover:bg-transparent"
            style={{ 
              "--hover-bg-color": `${colourway.pantone !== props.currentColourway.pantone ? colourway.hex : "white"}`,
              backgroundColor: colourway.pantone === props.currentColourway.pantone ? `rgba(${hexToRgb(colourway.hex || "white")}, 0.1)` : "transparent"
            } as React.CSSProperties}
          >
            <div className="flex items-center gap-x-2 relative z-10">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: colourway.hex || "white" }}></div>
              <span className="block truncate font-normal group-data-[selected]:font-semibold">{colourway.pantone}</span>
            </div>
            {colourway.pantone === props.currentColourway.pantone && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 z-10">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            )}
            <div className="absolute inset-0 bg-[var(--hover-bg-color)] opacity-0 group-hover:opacity-10 -z-10"></div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
});

export default TShirtFabricColourway;
