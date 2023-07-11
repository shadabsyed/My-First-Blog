import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchFdImg = (featuredImg) => {
  return useQuery({
    queryKey: ["Fimage", featuredImg],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/media/${featuredImg}`
      ).then((res) => res.json()),
    enabled: Boolean(featuredImg),
  });
};

export default fetchFdImg;
