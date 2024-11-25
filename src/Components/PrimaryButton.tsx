import { CSSProperties, MouseEvent, ReactNode } from "react";

type PrimaryButtonProps = {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
};

function PrimaryButton({
  children,
  onClick,
  disabled = false,
  style = {},
}: PrimaryButtonProps) {
  return (
    <button style={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default PrimaryButton;
