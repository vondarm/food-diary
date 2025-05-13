import { DateCalendar } from "@mui/x-date-pickers";
import { Day } from "./Day.tsx";

export const Calendar = () => (
  <DateCalendar
    slots={{
      day: Day,
    }}
  />
);
