import { type FC, type ReactNode } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { useKcalForDay } from "../CoreAdapter.tsx";
import {
  getDayOvereatingLevel,
  type OvereatingLevel,
} from "../../core/meals/overeatingLevel.ts";
import { Alert, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { onModalDay } from "./data.ts";
import { DayTable } from "./DayTable.tsx";
import { NewMealForm } from "./NewMealForm";
import type { AlertProps } from "@mui/material/Alert";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const DayDrawerContent: FC<{ day: Dayjs }> = ({ day }) => {
  const today = dayjs();

  const isToday = day.diff(today.startOf("day"), "millisecond");
  const kcal = useKcalForDay(day);

  const overeatingLevel = getDayOvereatingLevel(kcal, 2500);
  const color = getDayColorByOvereatingLevel(overeatingLevel, isToday);
  const text = getDayDescriptionByOvereatingLevel(overeatingLevel, isToday);

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      spacing={2}
      padding={2}
      style={{ height: "85dvh" }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        flexWrap={"wrap"}
        useFlexGap
        justifyContent={"space-around"}
      >
        <DatePicker value={day} onChange={onModalDay} />
        <Alert
          style={{ alignItems: "center" }}
          icon={getIconByOvereatingLevel(overeatingLevel, isToday)}
          severity={isToday > 0 ? "info" : color}
        >
          {text}
        </Alert>
      </Stack>
      <DayTable day={day} />
      <NewMealForm day={day} />
    </Stack>
  );
};

const getDayColorByOvereatingLevel = (
  level: OvereatingLevel,
  isToday: number,
): AlertProps["severity"] => {
  if (isToday > 0) {
    return "info";
  }
  switch (level) {
    case "low":
      return "info";
    case "normal":
      return "success";
    case "high":
      return "warning";
    case "extra high":
      return "error";
    case "incredible":
      return "error";
  }
};

const getIconByOvereatingLevel = (
  level: OvereatingLevel,
  isToday: number,
): ReactNode => {
  if (isToday > 0) {
    return <ReportProblemIcon />;
  }
  switch (level) {
    case "low":
      return <RestaurantMenuIcon />;
    case "normal":
      return <CheckCircleIcon />;
    case "high":
      return <ReportProblemIcon />;
    case "extra high":
      return "🐷";
    case "incredible":
      return "🐷";
  }
};

const getDayDescriptionByOvereatingLevel = (
  level: OvereatingLevel,
  isToday: number,
): string => {
  if (isToday > 0) {
    return "Этот день еще не настал. Странно если тут что то заполнено.";
  }
  if (isToday === 0) {
    switch (level) {
      case "low":
        return "Сегодня еще можно поесть";
      case "normal":
        return "Сегодня хорощий день. Главное все не испортить";
      case "high":
        return "Кажется сегодня мы переели. Пора остановиться";
      case "extra high":
        return "Сегодня мы уже обожрались. Может хватит?";
      case "incredible":
        return "Кажется сегодня уже нечего терять";
    }
  }
  if (isToday < 0) {
    switch (level) {
      case "low":
        return "В тот день мы скушали меньше необходимого";
      case "normal":
        return "Был хороший день. Покушали в самый раз";
      case "high":
        return "В тот день мы немного перебрали";
      case "extra high":
        return "В тот день мы серьезно объелись";
      case "incredible":
        return "Был скверный день. Обожрались как свинота";
    }
  }
  return "Если вы видите это, значит что то сломалось";
};
