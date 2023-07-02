import { useParams } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import fetchPost from "../modules/SinglePost-page-modules/fetch_posts_by_slug";
import fetchCategory from "../modules/SinglePost-page-modules/fetch_category";
import fetchFeaturedImg from "../modules/SinglePost-page-modules/fetch_featured_img";
import fetchAuthorName from "../modules/SinglePost-page-modules/fetch_author_name";

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

  if (imageUrl && categoryName && authorName)
    return (
      <div className="card">
        <div className="card-body">
          <img src={imageUrl} alt="Featured"  />

          <p className="card-text category">{categoryName.name}</p>

          <h2 className="card-title">{data.title.rendered}</h2>

          <p className="card-text">
            by {authorName} <span className="dot"></span>
            {formatDate(data.date)}
          </p>

          <div
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
            className="card-text"
          ></div>
        </div>
      </div>
    );
}

export default SinglePost;
