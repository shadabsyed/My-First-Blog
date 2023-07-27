import { useQuery } from "@tanstack/react-query";

function fetchPosts(pageNumber) {
  return useQuery({
    queryKey: ["allPosts", pageNumber],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/posts?page=${pageNumber}&per_page=8`
      ).then((res) => res.json()),
  });
}

export default fetchPosts;
