import { observer } from "mobx-react-lite";

const DraftsList = observer(() => {
  const drafts = [
    {
      code: "#69175",
      productName: "Product Name",
      brandName: "Brand Name",
      type: "T-Shirt",
      updateUserName: "User Name",
      updateDate: "1d ago",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  ];
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
              Type
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
          {drafts.map((draft) => (
            <tr key={draft.code}>
              <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div className="text-gray-900">{draft.code}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div className="text-gray-900">{draft.productName}</div>
                <div className="mt-1 text-gray-500">{draft.brandName}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div className="text-gray-900">{draft.type}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div className="flex items-center">
                  <div className="size-11 shrink-0">
                    <img alt="" src={draft.image} className="size-11 rounded-full" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{draft.updateUserName}</div>
                    <div className="mt-1 text-gray-500">{draft.updateDate}</div>
                  </div>
                </div>
              </td>
              <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
});

export default DraftsList;
