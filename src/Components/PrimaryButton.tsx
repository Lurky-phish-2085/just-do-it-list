import { ButtonHTMLAttributes } from "react";

function PrimaryButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...props} className="">
      {props.children}
    </button>
  );
}

export default PrimaryButton;
