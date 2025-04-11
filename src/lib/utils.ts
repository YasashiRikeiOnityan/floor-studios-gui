export  const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
}

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const formatRelativeTime = (isoString: string): string => {
  const now = new Date();
  const target = new Date(isoString);
  const diffMs = now.getTime() - target.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else {
    const month = target.getMonth() + 1;
    const day = target.getDate();
    return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  }
}
