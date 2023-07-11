import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchAuthorName = (authorId) => {
  return useQuery({
    queryKey: ["author", authorId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/users/${authorId}`
      ).then((res) => res.json()),
    enabled: Boolean(authorId),
  });
};

export default fetchAuthorName;
