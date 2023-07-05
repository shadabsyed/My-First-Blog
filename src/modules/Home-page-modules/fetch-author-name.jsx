import { useQuery } from "@tanstack/react-query";

export function fetchAuthorName() {
  return useQuery({
    queryKey: ["authorName"],
    queryFn: () =>
      fetch("https://onlydev.ml/stest/wp-json/wp/v2/users").then((res) =>
        res.json()
      ),
  });
}
