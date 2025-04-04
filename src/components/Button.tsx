import { MouseEventHandler } from "react";
import clsx from "clsx";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  style?: "fill" | "outline" | "text";
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  text: string;
  loadingText?: string;
  fullWidth?: boolean
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={clsx(
        "flex justify-center rounded-sm px-6 py-0.5 text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          "shadow-sm bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600": props.style === "fill",
          "shadow-sm border border-indigo-600 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600": props.style === "outline",
          "text-indigo-600 hover:bg-indigo-100": props.style === "text",
        },
        {
          "w-full": props.fullWidth
        }
      )}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
      style={{ cursor: props.disabled ? "not-allowed" : "pointer" }}
    >
      {props.loading ? props.loadingText : props.text}
    </button>
  );
};

export default Button;
