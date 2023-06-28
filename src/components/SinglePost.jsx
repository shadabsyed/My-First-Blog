import { useParams } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import fetchPost from "../modules/fetch_posts_by_slug";
import fetchCategory from "../modules/fetch_category";
import fetchFeaturedImg from "../modules/fetch_featured_img";
import { useQuery } from "@tanstack/react-query";
import fetchAuthorName from "../modules/fetch_author_name";

function SinglePost() {
  const { slug } = useParams();

  const { isLoading, error, data: postData } = fetchPost(slug);

  const data = postData?.[0];

  /**
   *   Fetch Category
   */

  const categoryId = data?.categories?.[0];
  const {
    isLoading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = fetchCategory(categoryId);

  /**
   * Fetch Featured Image
   */

  const featuredImageId = data?.featured_media;

  const {
    isLoading: imageLoading,
    error: imageError,
    data: imageData,
  } = fetchFeaturedImg(featuredImageId);

  /**
   * Fetch Author Name
   */

  const authorId = data?.author;

  const {
    isLoading: authorLoading,
    error: authorError,
    data: authorData,
  } = fetchAuthorName(authorId);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const categoryName = categoryData;
  const imageUrl = imageData?.source_url;
  const authorName = authorData?.name;

  return (
    <div className="card">
      <div className="card-body">
        {imageUrl && <img src={imageUrl} alt="Featured" />}
        <h2 className="card-title">{data.title.rendered}</h2>
        {categoryName && <p className="card-text">{categoryName.name}</p>}
        {authorName && (
          <p className="card-text">
            by {authorName} <span className="dot"></span>
            {formatDate(data.date)}
          </p>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: data.content.rendered }}
          className="card-text"
        ></div>
      </div>
    </div>
  );
}

export default SinglePost;
