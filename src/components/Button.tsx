import { MouseEventHandler } from "react";
import clsx from "clsx";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  onClick: MouseEventHandler<HTMLButtonElement>;
  outlined?: boolean;
  loading?: boolean;
  text: string;
  loadingText?: string;
  fullWidth?: boolean
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={clsx(
        "flex justify-center rounded-sm px-6 py-0.5 text-sm/6 font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600": !props.outlined,
          "border border-indigo-600 text-indigo-600 hover:shadow-indigo-400 focus-visible:outline-indigo-600": props.outlined,
        },
        {
          "w-full": props.fullWidth
        }
      )}
      disabled={props.loading}
      onClick={props.onClick}
    >
      {props.loading ? props.loadingText : props.text}
    </button>
  );
};

export default Button;
