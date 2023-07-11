import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchCategoryName = (categoryId) => {
  return useQuery({
    queryKey: ["categoryName", categoryId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/categories/${categoryId}`
      ).then((res) => res.json()),
    enabled: Boolean(categoryId),
  });
};

export default fetchCategoryName;
