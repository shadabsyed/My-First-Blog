import { useQuery } from "@tanstack/react-query";

function fetchPost() {
  return useQuery({
    queryKey: ["allPosts"],
    queryFn: () =>
      fetch("https://hostplover.com/stest/wp-json/wp/v2/posts/").then((res) =>
        res.json()
      ),
  });
}

export default fetchPost;
