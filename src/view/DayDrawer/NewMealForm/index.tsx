import type { FC } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { useNewMealFrom } from "./useNewMealFrom.ts";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TimePicker } from "@mui/x-date-pickers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const NewMealForm: FC<{ day: Dayjs }> = ({ day }) => {
  const {
    formValue,
    setFieldValue,
    submit,
    isError,
    isFormActive,
    openForm,
    cancel,
  } = useNewMealFrom(day);

  const isSmallViewPort = useMediaQuery("(max-width: 600px)");

  if (!isFormActive)
    return (
      <Button variant="outlined" onClick={openForm} endIcon={<AddIcon />}>
        Добавить скушанный продукт
      </Button>
    );

  return (
    <Stack direction={isSmallViewPort ? "column" : "row"} spacing={2}>
      <TextField
        autoFocus
        required
        label="Название"
        variant="outlined"
        value={formValue.title || ""}
        onChange={(e) => setFieldValue("title")(e.currentTarget.value)}
        error={isError}
      />
      <TextField
        required
        label="Кал (на 100 г)"
        variant="outlined"
        type="number"
        value={formValue.kcal || ""}
        onChange={(e) => setFieldValue("kcal")(Number(e.currentTarget.value))}
        error={isError}
      />
      <TextField
        required
        label="Масса"
        variant="outlined"
        type="number"
        value={formValue.weight || ""}
        onChange={(e) => setFieldValue("weight")(Number(e.currentTarget.value))}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">г.</InputAdornment>,
          },
        }}
        error={isError}
      />
      <TimePicker
        value={formValue.time || dayjs()}
        onChange={setFieldValue("time")}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <IconButton color={"success"} onClick={submit}>
          <CheckCircleIcon />
        </IconButton>
        <IconButton color={"error"} onClick={cancel}>
          <CancelIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
