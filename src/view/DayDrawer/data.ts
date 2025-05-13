import { createSignal } from "@react-rxjs/utils";
import type { Dayjs } from "dayjs";
import { bind } from "@react-rxjs/core";

const [modalDay$, onModalDay] = createSignal<Dayjs | null>();
const [useModalDay] = bind(modalDay$, null);

export { useModalDay, onModalDay };
