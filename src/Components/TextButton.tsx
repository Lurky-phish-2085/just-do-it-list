import { ButtonHTMLAttributes } from "react";

function TextButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="outline"
      type="button"
      style={{ border: "none" }}
    >
      {props.children}
    </button>
  );
}

export default TextButton;
