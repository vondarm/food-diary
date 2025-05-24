import {
  Stack,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "./Calendar";
import { Subscribe } from "@react-rxjs/core";
import { DayDrawer } from "./DayDrawer";
import { onModalDay } from "./DayDrawer/data.ts";
import { WeekLabel } from "./WeekLabel.tsx";
import dayjs from "dayjs";

const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

function App() {
  const openToday = () => {
    onModalDay(dayjs().startOf("day"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
      <ThemeProvider theme={darkTheme}>
        <Subscribe>
          <Paper sx={{ height: "100dvh", borderRadius: 0, padding: 2 }}>
            <Stack alignItems={"center"} spacing={2}>
              <Calendar />
              <Button variant={"outlined"} onClick={openToday}>
                Сегодня
              </Button>
              <DayDrawer />
              <WeekLabel />
            </Stack>
          </Paper>
        </Subscribe>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
