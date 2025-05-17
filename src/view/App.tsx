import { Stack, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "./Calendar";
import { Subscribe } from "@react-rxjs/core";
import { DayDrawer } from "./DayDrawer";
import { onModalDay } from "./DayDrawer/data.ts";
import { WeekLabel } from "./WeekLabel.tsx";
import dayjs from "dayjs";

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
          <WeekLabel />
        </Stack>
      </Subscribe>
    </LocalizationProvider>
  );
}

export default App;
