import { useQuery } from "@tanstack/react-query";

function fetchFeaturedImg(featuredImageId) {
  return useQuery({
    queryKey: ["image", featuredImageId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/media/${featuredImageId}`
      ).then((res) => res.json()),
    enabled: Boolean(featuredImageId),
  });
}

export default fetchFeaturedImg;
