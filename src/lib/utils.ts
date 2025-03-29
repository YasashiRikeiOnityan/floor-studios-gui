export  const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
}

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
