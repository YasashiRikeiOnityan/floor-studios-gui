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
    // {
    //   id: "SHORTS",
    //   name: "Shorts",
    //   image: "/shorts.png",
    // }
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