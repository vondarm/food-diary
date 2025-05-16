import { useConfirmDialog, closeConfirm } from "./confirmDialog.ts";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const ConfirmDialog = () => {
  const config = useConfirmDialog();

  const confirm = () => {
    config?.onConfirm();
    closeConfirm();
  };

  return (
    <Dialog open={Boolean(config)} onClose={closeConfirm}>
      <DialogTitle>{config?.message}</DialogTitle>
      <DialogActions>
        <Button onClick={confirm}>Да</Button>
        <Button onClick={closeConfirm}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
};
