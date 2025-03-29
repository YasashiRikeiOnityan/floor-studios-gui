import { classNames } from '@/lib/utils'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'

type TabsProps = {
  tabs: string[];
  state: string;
  callBackUpdateState: (state: string) => void;
}

export default function Tabs(props: TabsProps) {
  return (
    <div>
      {/* <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue={props.tabs.find((tab) => tab === props.state)}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          onChange={(e) => props.callBackUpdateState(e.target.value)}
        >
          {props.tabs.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div> */}
      <div className="block">
      {/* <div className="hidden sm:block"> */}
        <nav aria-label="Tabs" className="flex space-x-4">
          {props.tabs.map((tab) => (
            <div
              key={tab}
              aria-current={tab === props.state ? 'page' : undefined}
              className={classNames(
                tab === props.state ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium',
              )}
              onClick={() => props.callBackUpdateState(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
