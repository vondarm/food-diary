import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { type FC, type ReactNode, useState } from "react";
import { stopPropagationDecorator } from "../lib.ts";

interface Props {
  message: string;
  onConfirm: () => void;
  renderTrigger: (onClick: () => void) => ReactNode;
}

export const ConfirmDialog: FC<Props> = ({
  onConfirm,
  message,
  renderTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const confirm = () => {
    onConfirm();
    close();
  };

  return (
    <>
      {renderTrigger(open)}
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>{message}</DialogTitle>
        <DialogActions>
          <Button onClick={stopPropagationDecorator(confirm)}>Да</Button>
          <Button onClick={stopPropagationDecorator(close)}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
