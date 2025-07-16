type StatusBadgeProps = {
  status: string;
}

const StatusBadge = (props: StatusBadgeProps) => {
  if (props.status === "DRAFT") {
    return (
      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-yellow-500">
          <circle r={3} cx={3} cy={3} />
        </svg>
        Draft
      </span>
    )
  } else if (props.status === "COMPLETE") {
    return (
      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800">
        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-500">
          <circle r={3} cx={3} cy={3} />
        </svg>
        Completed
      </span>
    )
  } else {
    return <></>
  }
}

export default StatusBadge;