import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import { useKcalForDay } from "../CoreAdapter.tsx";
import { onModalDay } from "../DayDrawer/data.ts";
import { getDayOvereatingLevel } from "../../core/meals/overeatingLevel.ts";
import { getColorByOvereatingLevel } from "../getColorByOvereatingLevel.ts";

export const Day = (props: PickersDayProps) => {
  const { day, ...other } = props;

  const kcal = useKcalForDay(day);

  const overeatingLevel = getDayOvereatingLevel(kcal, 2500);
  const badgeColor = getColorByOvereatingLevel(overeatingLevel);

  return (
    <Badge
      key={props.day.toString()}
      max={Infinity}
      overlap="circular"
      badgeContent={kcal ? shortNumberFormatter.format(kcal) : void 0}
      color={badgeColor}
    >
      <PickersDay {...other} day={day} onDaySelect={onModalDay} />
    </Badge>
  );
};

const shortNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
});
