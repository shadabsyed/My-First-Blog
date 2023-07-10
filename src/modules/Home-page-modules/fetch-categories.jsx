import { useQuery } from "@tanstack/react-query";

export function fetchCategories(data) {
  let categoryIds = [];
  if (data && data.length)
    data.forEach((item) => {
      categoryIds = categoryIds.concat(item.categories);
    });

  categoryIds = [...new Set(categoryIds)];

  return useQuery({
    queryKey: ["allCategories"],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/categories?include=${categoryIds.join(
          ","
        )}`
      ).then((res) => res.json()),
    enabled: Boolean(data && data.length),
  });
}
