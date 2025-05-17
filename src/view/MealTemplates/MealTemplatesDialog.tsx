import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { type FC, useState } from "react";
import { useSearchMealTemplates } from "./useSearchMealTemplates.ts";
import type { MealTemplate } from "../../core/types.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import { onRemoveMealTemplate } from "../CoreAdapter.tsx";
import { ConfirmDialog } from "../common/Dialog/ConfigmDialog.tsx";

interface Props {
  onChoose: (mealTemplate: MealTemplate) => void;
  buttonText: string;
}

export const MealTemplatesDialog: FC<Props> = ({ onChoose, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const choose = (mealTemplate: MealTemplate) => () => {
    onChoose(mealTemplate);
    close();
  };
  const deleteTemplate = (mealTemplate: MealTemplate) => () =>
    onRemoveMealTemplate(mealTemplate);

  const { results } = useSearchMealTemplates();

  return (
    <>
      <Button variant="outlined" onClick={open}>
        {buttonText}
      </Button>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Выберите шаблон</DialogTitle>
        {!results.length && (
          <DialogContent>
            <DialogContentText>Здесь пока что нету шаблонов</DialogContentText>
          </DialogContent>
        )}
        <List sx={{ pt: 0 }}>
          {results.map((mealTemplate) => (
            <ListItem disablePadding key={mealTemplate.uuid}>
              <ListItemButton onClick={choose(mealTemplate)}>
                <ListItemText
                  primary={mealTemplate.name}
                  secondary={`${mealTemplate.kcal} Кал, ${mealTemplate.weight} г.`}
                />
                <ConfirmDialog
                  message={`Удалить шаблон ${mealTemplate.name}?`}
                  onConfirm={deleteTemplate(mealTemplate)}
                  renderTrigger={(onClick) => (
                    <IconButton color={"info"} onClick={onClick}>
                      <DeleteIcon color={"error"} />
                    </IconButton>
                  )}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
