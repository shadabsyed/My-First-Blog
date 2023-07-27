import { useQuery } from "@tanstack/react-query";

export function fetchFeaturedImgs(data, pageNumber) {
  // get featured imgs ids

  let imgsIds = [];
  if (data && data.length) {
    imgsIds = data.map((item) => item.featured_media);

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
    enabled: Boolean(data && data.length),
  });
}
