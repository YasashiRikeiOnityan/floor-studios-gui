import { SpecificationStatus } from "@/lib/type";
import { formatRelativeTime } from "@/lib/utils";
import { specificationStore } from "@/stores/specificationStore";
import { useEffect } from "react";
import SpecificationMenu from "./SpecificationMenu";
import { observer } from "mobx-react-lite";
import Loading from "./Loading";

type TypesProps = {
  currentType: string;
  callBackUpdateState: (state: string) => void;
}

const Types = (props: TypesProps) => {
  const types = [
    {
      id: "T-SHIRT",
      name: "T-Shirt",
      image: "/t-shirt.png",
    },
    {
      id: "SHORTS",
      name: "Shorts",
      image: "/shorts.png",
    }
  ];
  return (
    <>
      {types.map((type) => (
        <div key={type.id} className={`rounded-lg ${props.currentType === type.id ? "bg-indigo-100" : "bg-white"} shadow-md`} onClick={() => props.callBackUpdateState(type.id)}>
          <div className="p-4">
            <div className="flex flex-col items-center justify-center gap-1">
                <img src={type.image} alt={type.name} className="h-full" />
                <div className="text-md">
                  {type.name}
                </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
};

export default Types;