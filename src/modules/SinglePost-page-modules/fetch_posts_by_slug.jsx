import { useQuery } from "@tanstack/react-query";

function fetchPost(slug) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () =>
      fetch(
        `http://hostplover.com/stest/wp-json/wp/v2/posts/?slug=${slug}`
      ).then((res) => res.json()),
  });
}

export default fetchPost;
