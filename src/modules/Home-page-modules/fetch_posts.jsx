import { useQuery } from "@tanstack/react-query";

function fetchPosts(pageNumber) {
  return useQuery({
    queryKey: ["allPosts", pageNumber],
    queryFn: async () => {
      const response = await fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/posts?page=${pageNumber}&per_page=1`
      );

      const postdata = await response.json();

      const headers = response.headers;

      return { postdata, headers };
    },
  });
}

export default fetchPosts;
