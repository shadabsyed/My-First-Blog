import { useQuery } from "@tanstack/react-query";

export function fetchFeaturedImgs() {
  return useQuery({
    queryKey: ["featuredImages"],
    queryFn: () =>
      fetch("https://hostplover.com/stest/wp-json/wp/v2/media").then((res) =>
        res.json()
      ),
  });
}
