import { useMealTemplates } from "../CoreAdapter.tsx";
import { useMemo, useState } from "react";

export const useSearchMealTemplates = () => {
  const [search, setSearch] = useState("");
  const templates = useMealTemplates();

  const results = useMemo(
    () =>
      search
        ? templates.filter((template) =>
            template.name.toLowerCase().includes(search.toLowerCase()),
          )
        : templates,
    [templates, search],
  );

  return {
    search,
    results,
    setSearch,
  };
};
