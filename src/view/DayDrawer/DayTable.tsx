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
import {
  onAddMealTemplate,
  onRemoveMeal,
  useMealsForDay,
} from "../CoreAdapter.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
import { v4 } from "uuid";
import { ConfirmDialog } from "../common/Dialog/ConfigmDialog.tsx";

interface Props {
  day: Dayjs;
}

export const DayTable: FC<Props> = ({ day }) => {
  const meals = useMealsForDay(day);

  const deleteMeal = (meal: Meal) => () => onRemoveMeal(meal);
  const saveToTemplates = (meal: Meal) => () =>
    onAddMealTemplate({
      uuid: v4(),
      weight: meal.weight,
      kcal: meal.kcal,
      name: meal.name,
    });

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30%" }}>Название</TableCell>
            <TableCell align="right">Кал (на 100г)</TableCell>
            <TableCell align="right">Масса (г)</TableCell>
            <TableCell align="right">Кал (Всего)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal: Meal) => (
            <TableRow key={meal.name}>
              <TableCell
                sx={{
                  width: "35%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {meal.name}
              </TableCell>
              <TableCell align="right">{Math.round(meal.kcal)}</TableCell>
              <TableCell align="right">{Math.round(meal.weight)}</TableCell>
              <TableCell align="right">
                {Math.round(getFullKcal(meal))}
              </TableCell>
              <TableCell sx={{ flexWrap: "nowrap" }}>
                <ConfirmDialog
                  message={`Вы уверены что хотите удалить ${meal.name}?`}
                  onConfirm={deleteMeal(meal)}
                  renderTrigger={(onClick) => (
                    <IconButton color={"error"} onClick={onClick}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                />
                <ConfirmDialog
                  message={`Добавить ${meal.name} в шаблоны?`}
                  onConfirm={saveToTemplates(meal)}
                  renderTrigger={(onClick) => (
                    <IconButton color={"info"} onClick={onClick}>
                      <AssignmentAddIcon />
                    </IconButton>
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
