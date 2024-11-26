import { CSSProperties, MouseEvent, ReactNode } from "react";

type TextButtonProps = {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
};

function TextButton({
  children,
  onClick,
  disabled = false,
  style = { border: "none" },
}: TextButtonProps) {
  return (
    <button
      className="outline"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default TextButton;
