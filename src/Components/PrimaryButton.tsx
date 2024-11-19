import { MouseEvent, ReactNode } from "react";

type PrimaryButtonProps = {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default PrimaryButton;
