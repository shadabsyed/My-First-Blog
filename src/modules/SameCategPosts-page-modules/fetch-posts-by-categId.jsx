import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchPostsByCategId = (categoryId) => {
  return useQuery({
    queryKey: ["categoryPosts", categoryId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/posts?categories=${categoryId}`
      ).then((res) => res.json()),
    enabled: !!categoryId,
  });
};

export default fetchPostsByCategId;
