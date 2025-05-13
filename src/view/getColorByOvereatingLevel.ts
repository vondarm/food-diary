import type { OvereatingLevel } from "../core/meals/overeatingLevel.ts";
import type { BadgeOwnProps } from "@mui/material/Badge";

export const getColorByOvereatingLevel = (
  level: OvereatingLevel,
): BadgeOwnProps["color"] => {
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
