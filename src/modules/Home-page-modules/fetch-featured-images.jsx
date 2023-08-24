import { useQuery } from "@tanstack/react-query";

export function fetchFeaturedImgs(posts, pageNumber) {
  // get featured imgs ids

  let imgsIds = [];
  if (posts && posts.length) {
    imgsIds = posts.map((item) => item.featured_media);

    imgsIds = [...new Set(imgsIds)];
  }

  return useQuery({
    queryKey: ["featuredImages", pageNumber],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/media?include=${imgsIds.join(
          ","
        )}`
      ).then((res) => res.json()),
    enabled: Boolean(posts && posts.length),
  });
}
