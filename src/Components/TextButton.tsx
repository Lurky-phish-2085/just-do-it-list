import { MouseEvent, ReactNode } from "react";

type TextButtonProps = {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

function TextButton({ children, onClick, disabled = false }: TextButtonProps) {
  return (
    <button
      className="outline"
      style={{ border: "none" }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default TextButton;
