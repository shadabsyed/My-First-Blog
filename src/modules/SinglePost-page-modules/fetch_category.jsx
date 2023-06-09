import { useQuery } from "@tanstack/react-query";

function fetchCategory(categoryId) {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/categories/${categoryId}`
      ).then((res) => res.json()),
    enabled: Boolean(categoryId),
  });
}

export default fetchCategory;
