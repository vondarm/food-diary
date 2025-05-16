import { createSignal } from "@react-rxjs/utils";
import { map, merge } from "rxjs";
import { bind } from "@react-rxjs/core";

type ConfirmPayload = {
  message: string;
  onConfirm: () => void;
};

const [confirmOpenRequest$, openConfirm] = createSignal<ConfirmPayload>();
const [confirmCloseRequest$, closeConfirm] = createSignal();

const confirmDialog$ = merge(
  confirmOpenRequest$,
  confirmCloseRequest$.pipe(map(() => null)),
);

const [useConfirmDialog] = bind(confirmDialog$, null);

export { useConfirmDialog, openConfirm, closeConfirm };
