import { observer } from "mobx-react-lite";
import { Specification } from "@/lib/type/specification/type";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

type DraftsListProps = {
  specifications: Specification[];
}

const DraftsList = observer(({ specifications }: DraftsListProps) => {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString + "Z");
    return format(date, "yyyy/MM/dd HH:mm", { locale: ja });
  };

  return (
    <div className="flex mt-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Product Code
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Product Information
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Updated
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {specifications.map((specification) => (
            <tr key={specification.specificationId}>
              <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div className="text-gray-900">{specification.productCode}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div className="text-gray-900">{specification.productName}</div>
                <div className="mt-1 text-gray-500">{specification.brandName}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                {specification.updatedAt ? formatDate(specification.updatedAt) : ""}
              </td>
              <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <a href="#" className="text-blue-600 hover:text-blue-900">
                  Edit
                </a>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
});

export default DraftsList;
