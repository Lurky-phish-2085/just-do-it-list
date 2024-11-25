import { CSSProperties, ReactNode, useState } from "react";
import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import DialogTypes from "./enums/dialogTypes";
import PrimaryButton from "./PrimaryButton";
import TextButton from "./TextButton";

type DialogProps = {
  children: ReactNode;
  type: DialogTypes;
  acceptButtonText?: string;
  onAccept: () => void;
  onCancel?: () => void;
};

function Dialog({
  children,
  type,
  acceptButtonText = "Confirm",
  onAccept,
  onCancel,
}: DialogProps) {
  let headerIcon: ReactNode = <AiOutlineInfoCircle />;
  const headerIconStyle: CSSProperties = { width: 36, height: 36 };
  switch (type) {
    case DialogTypes.INFO:
      headerIcon = (
        <AiOutlineInfoCircle style={{ ...headerIconStyle, color: "#1E90FF" }} />
      );
      break;
    case DialogTypes.WARNING:
      headerIcon = (
        <AiOutlineWarning style={{ ...headerIconStyle, color: "gold" }} />
      );
      break;
    case DialogTypes.ERROR:
      headerIcon = (
        <BiErrorAlt style={{ ...headerIconStyle, color: "crimson" }} />
      );
      break;

    default:
      break;
  }
  const headerText = type;
  const acceptButtonStyle: CSSProperties =
    type === DialogTypes.WARNING
      ? { backgroundColor: "red", borderColor: "crimson" }
      : {};

  const handleOnAccept = () => {
    onAccept();
  };
  const handleOnCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <>
      <dialog open>
        <article>
          <div style={{ flexDirection: "row", display: "flex", gap: "8px" }}>
            {headerIcon}
            <h2>{headerText}</h2>
          </div>
          {children}
          <footer>
            {type === DialogTypes.INFO ? (
              <PrimaryButton onClick={handleOnAccept} style={acceptButtonStyle}>
                {acceptButtonText}
              </PrimaryButton>
            ) : (
              <>
                <TextButton onClick={handleOnCancel}>Cancel</TextButton>
                <PrimaryButton
                  onClick={handleOnAccept}
                  style={acceptButtonStyle}
                >
                  {acceptButtonText}
                </PrimaryButton>
              </>
            )}
          </footer>
        </article>
      </dialog>
    </>
  );
}

export default Dialog;
