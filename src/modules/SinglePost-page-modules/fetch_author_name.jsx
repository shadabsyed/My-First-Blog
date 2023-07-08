import { useQuery } from "@tanstack/react-query";

function fetchAuthorName(authorId) {
  return useQuery({
    queryKey: ["author", authorId],
    queryFn: () =>
      fetch(`http://hostplover.com/stest/wp-json/wp/v2/users/${authorId}`).then(
        (res) => res.json()
      ),
    enabled: Boolean(authorId),
  });
}

export default fetchAuthorName;
