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

  if (relativeDiff < -0.3) return "low";
  if (relativeDiff < 0.0) return "normal";
  if (relativeDiff < 0.3) return "high";
  if (relativeDiff < 0.6) return "extra high";
  return "incredible";
};
