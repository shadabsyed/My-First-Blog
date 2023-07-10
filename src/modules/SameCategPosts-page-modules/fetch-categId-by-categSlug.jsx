import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchCategIdByCategSlug = (category_slug) => {
  return useQuery({
    queryKey: ["categorySlugId", category_slug],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/categories?slug=${category_slug}`
      ).then((res) => res.json()),
  });
};

export default fetchCategIdByCategSlug;
