import { MouseEventHandler } from "react";
import clsx from "clsx";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  style?: "fill" | "outline" | "text" | "alert" | "cancel";
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
  children?: React.ReactNode;
  fullWidth?: boolean
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={clsx(
        "flex justify-center items-center rounded-sm px-6 py-0.5 text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          "shadow-sm bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600": props.style === "fill",
          "shadow-sm border border-blue-600 text-blue-600 hover:bg-blue-100 focus-visible:outline-blue-600": props.style === "outline",
          "text-blue-600 hover:bg-blue-100": props.style === "text",
          "shadow-sm bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600": props.style === "alert",
          "text-gray-600 hover:bg-gray-200": props.style === "cancel",
        },
        {
          "w-full": props.fullWidth
        }
      )}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
      style={{ cursor: props.disabled ? "not-allowed" : "pointer" }}
    >
      {props.loading ? props.loadingText : props.children || props.text}
    </button>
  );
};

export default Button;
