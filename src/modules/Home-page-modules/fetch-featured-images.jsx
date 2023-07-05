import { useQuery } from "@tanstack/react-query";

export function fetchFeaturedImgs() {
  return useQuery({
    queryKey: ["featuredImages"],
    queryFn: () =>
      fetch("https://onlydev.ml/stest/wp-json/wp/v2/media").then((res) =>
        res.json()
      ),
  });
}
