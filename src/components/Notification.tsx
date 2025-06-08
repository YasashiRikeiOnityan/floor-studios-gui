import { Transition } from '@headlessui/react';
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { notificationStore, Notification as NotificationType } from '@/stores/notificationStore';
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
} as const;

const NotificationItem = ({ notification }: { notification: NotificationType }) => {
  const { border, iconColor, Icon } = typeStyles[notification.type] || typeStyles.success;

  return (
    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
      <div className={`p-4 border ${border} bg-white rounded-lg w-full`}>
        <div className="flex items-start w-full">
          <div className="shrink-0">
            <Icon aria-hidden="true" className={`size-6 ${iconColor}`} />
          </div>
          <div className="ml-3 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
            <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
          </div>
          <div className="ml-4 flex shrink-0">
            <button
              type="button"
              onClick={() => notificationStore.removeNotification(notification.id)}
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notification = observer(() => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-14 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {notificationStore.visibleNotifications.map((notification) => (
          <Transition
            key={notification.id}
            show={true}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="w-full sm:w-[360px]"
          >
            <NotificationItem notification={notification} />
          </Transition>
        ))}
      </div>
    </div>
  );
});

export default Notification;
