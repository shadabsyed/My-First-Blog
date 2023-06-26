import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../modules/formatDate";

function SinglePost() {
  const { slug } = useParams();

  const {
    isLoading,
    error,
    data: postData,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () =>
      fetch(`http://site1.local/wp-json/wp/v2/posts/?slug=${slug}`).then(
        (res) => res.json()
      ),
  });

  const data = postData?.[0];

  const categoryId = data?.categories?.[0];
  const {
    isLoading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () =>
      fetch(`http://site1.local/wp-json/wp/v2/categories/${categoryId}`).then(
        (res) => res.json()
      ),
    enabled: Boolean(categoryId),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const categoryName = categoryData;

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{data.title.rendered}</h2>
        {categoryName && <p className="card-text">{categoryName.name}</p>}
        <p className="card-text">{formatDate(data.date)}</p>
        <div
          dangerouslySetInnerHTML={{ __html: data.content.rendered }}
          className="card-text"
        ></div>
      </div>
    </div>
  );
}

export default SinglePost;
