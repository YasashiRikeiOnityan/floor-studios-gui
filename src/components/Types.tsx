import { SpecificationType } from "@/lib/type/specification/type";

type TypesProps = {
  currentType: SpecificationType;
  callBackUpdateState: (state: SpecificationType) => void;
  disabled: boolean;
}

const Types = (props: TypesProps) => {
  const types: {id: SpecificationType, name: string, image: string}[] = [
    {
      id: "T-SHIRT",
      name: "T-Shirt",
      image: "/t-shirt.png",
    },
    {
      id: "LONG_SLEEVE",
      name: "Long Sleeve",
      image: "/long_sleeve.png",
    },
    {
      id: "CREWNECK",
      name: "Crewneck",
      image: "/crewneck.png",
    },
    {
      id: "HOODIE",
      name: "Hoodie",
      image: "/hoodie.png",
    },
    {
      id: "ZIP_HOODIE",
      name: "Zip-Hoodie",
      image: "/zip-hoodie.png",
    },
    {
      id: "HALF_ZIP",
      name: "Half Zip",
      image: "/halfzip.png",
    },
    {
      id: "KNIT_CREWNECK",
      name: "Knit Crewneck",
      image: "/knit_crewneck.png",
    },
    {
      id: "SWEATPANTS1",
      name: "Sweatpants1",
      image: "/sweatpants1.png",
    },
    
  ];

  return (
    <>
      {types.map((type) => (
        <div
          key={type.id}
          className={`rounded-sm ${props.currentType === type.id ? "bg-blue-50 outline-2 -outline-offset-2 outline-blue-600" : "bg-white"} shadow-md ${!props.disabled ? "cursor-pointer hover:bg-blue-50 transition duration-200 ease-in-out" : ""}`}
          onClick={() => {
            if (!props.disabled) {
              props.callBackUpdateState(type.id)
            }}}
        >
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