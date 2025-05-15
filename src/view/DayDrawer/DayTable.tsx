import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import type { FC } from "react";
import type { Meal } from "../../core/types.ts";
import { getFullKcal } from "../../core/meals";
import { onRemoveMeal, useMealsForDay } from "../CoreAdapter.tsx";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  day: Dayjs;
}

export const DayTable: FC<Props> = ({ day }) => {
  const meals = useMealsForDay(day);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">ККал (на 100г)</TableCell>
            <TableCell align="right">Масса (г)</TableCell>
            <TableCell align="right">Ккал (Всего)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal: Meal) => (
            <TableRow key={meal.name}>
              <TableCell>{meal.name}</TableCell>
              <TableCell align="right">{meal.kcal}</TableCell>
              <TableCell align="right">{meal.weight}</TableCell>
              <TableCell align="right">{getFullKcal(meal)}</TableCell>
              <TableCell>
                <IconButton color={"error"} onClick={() => onRemoveMeal(meal)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
