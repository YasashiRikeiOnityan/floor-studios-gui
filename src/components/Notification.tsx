import { Transition } from '@headlessui/react';
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { notificationStore } from '@/stores/notificationStore';
import { observer } from 'mobx-react-lite';

const typeStyles = {
  success: {
    border: 'border-green-400',
    iconColor: 'text-green-400',
    Icon: CheckCircleIcon,
  },
  error: {
    border: 'border-red-400',
    iconColor: 'text-red-400',
    Icon: XCircleIcon,
  },
  info: {
    border: 'border-blue-400',
    iconColor: 'text-blue-400',
    Icon: InformationCircleIcon,
  }
};

const Notification = observer(() => {
  const type = notificationStore.type;
  const { border, iconColor, Icon } = typeStyles[type] || typeStyles.success;

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-14 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition show={notificationStore.isOpenNotification}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className={`p-4 border ${border} bg-white rounded-lg`}>
                <div className="flex items-start">
                  <div className="shrink-0">
                    <Icon aria-hidden="true" className={`size-6 ${iconColor}`} />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{notificationStore.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{notificationStore.message}</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => notificationStore.closeNotification()}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
});

export default Notification;
