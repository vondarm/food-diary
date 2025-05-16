import { Stack, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "./Calendar";
import { Subscribe } from "@react-rxjs/core";
import { DayDrawer } from "./DayDrawer";
import "dayjs/locale/ru";
import { onModalDay } from "./DayDrawer/data.ts";
import dayjs from "dayjs";
import { ConfirmDialog } from "./Dialog/ConfigmDialog.tsx";

function App() {
  const openToday = () => {
    onModalDay(dayjs().startOf("day"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
      <Subscribe>
        <Stack alignItems={"center"} spacing={2}>
          <Calendar />
          <Button variant={"outlined"} onClick={openToday}>
            Сегодня
          </Button>
          <DayDrawer />
        </Stack>
        <ConfirmDialog />
      </Subscribe>
    </LocalizationProvider>
  );
}

export default App;
