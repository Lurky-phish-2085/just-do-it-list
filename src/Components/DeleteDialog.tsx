import Dialog from "./Dialog";
import DialogTypes from "./enums/dialogTypes";

type DeleteDialogProps = {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
};

function DeleteDialog({ open, onAccept, onCancel }: DeleteDialogProps) {
  return (
    <>
      <Dialog
        type={DialogTypes.WARNING}
        acceptButtonText="Delete"
        open={open}
        onAccept={onAccept}
        onCancel={onCancel}
      >
        <p>
          Are you sure you want to permanently delete this task? Once deleted,
          it cannot be recovered.
        </p>
      </Dialog>
    </>
  );
}

export default DeleteDialog;
