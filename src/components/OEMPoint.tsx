import { specificationStore } from "@/stores/specificationStore";
import { PaperClipIcon } from "@heroicons/react/20/solid";

const OEMPoint = () => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <>
      <p className="text-sm text-gray-500">
        {specificationStore.currentSpecification.productCode} - {specificationStore.currentSpecification.productName}
      </p>
      <h1 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">OEM Point</h1>
      {/* メインコンテンツ */}
      <div className="relative">
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="block w-full rounded-md bg-white px-3 pt-1.5 pb-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          defaultValue={''}
        />
        <div className="absolute bottom-2 left-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg> */}
            <PaperClipIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                // ファイルアップロードの処理
                handleFileChange(e);
              }}
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default OEMPoint;