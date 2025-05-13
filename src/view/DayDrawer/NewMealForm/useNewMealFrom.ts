import { useState } from "react";
import type { NewMealFormData, ValidMealFormData } from "./types.ts";
import { onAddMeal } from "../../CoreAdapter.tsx";
import { v4 } from "uuid";
import dayjs, { type Dayjs } from "dayjs";

const validate = (formData: NewMealFormData): formData is ValidMealFormData => {
  return (
    Boolean(formData.time) &&
    formData.weight !== void 0 &&
    formData.weight > 0 &&
    formData.kcal !== void 0 &&
    formData.kcal > 0 &&
    Boolean(formData.title)
  );
};

const getInitialFormValue = (date: Dayjs): NewMealFormData => {
  const today = dayjs();

  return {
    time: date.isSame(today, "day") ? today : date,
  };
};

export const useNewMealFrom = (day: Dayjs) => {
  const [isFormActive, setFormActive] = useState(false);
  const [formValue, setFormValue] = useState<NewMealFormData>(() =>
    getInitialFormValue(day),
  );
  const [isError, setIsError] = useState(false);

  const setFieldValue =
    <T extends keyof NewMealFormData>(fieldName: T) =>
    (value: NewMealFormData[T]) => {
      setIsError(false);
      setFormValue({ ...formValue, [fieldName]: value });
    };

  const clearForm = () => setFormValue(getInitialFormValue(day));
  const openForm = () => setFormActive(true);

  const submit = () => {
    if (validate(formValue)) {
      onAddMeal({
        uuid: v4(),
        kcal: formValue.kcal,
        name: formValue.title,
        weight: formValue.weight,
        dateTime: formValue.time.toDate(),
      });
      clearForm();
      setIsError(false);
      setFormActive(false);
    } else {
      setIsError(true);
    }
  };

  const cancel = () => {
    setFormActive(false);
    setIsError(false);
    clearForm();
  };

  return {
    formValue,
    setFieldValue,
    submit,
    cancel,
    isError,
    isFormActive,
    openForm,
  };
};
