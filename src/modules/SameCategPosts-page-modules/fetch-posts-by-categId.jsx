import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchPostsByCategId = (categoryId, currentPage) => {
  return useQuery({
    queryKey: ["categoryPosts", categoryId, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/posts?categories=${categoryId}&per_page=1&page=${currentPage}`
      );

      const data = await response.json();

      const headers = response.headers;

      return { data, headers };
    },
    enabled: !!categoryId,
  });
};

export default fetchPostsByCategId;
