export type OvereatingLevel =
  | "low"
  | "normal"
  | "high"
  | "extra high"
  | "incredible";

export const getDayOvereatingLevel = (
  kcalForDay: number,
  referenceKcal: number,
): OvereatingLevel => {
  const relativeDiff = (kcalForDay - referenceKcal) / referenceKcal;

  if (relativeDiff < -0.13) return "low";
  if (relativeDiff < 0.13) return "normal";
  if (relativeDiff < 0.25) return "high";
  if (relativeDiff < 0.5) return "extra high";
  return "incredible";
};
