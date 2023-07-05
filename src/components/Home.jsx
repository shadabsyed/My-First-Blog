import { Link } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import ArrowRight from "./ArrowRight";
import fetchPost from "../modules/Home-page-modules/fetch_posts";
import { fetchCategories } from "../modules/Home-page-modules/fetch-categories";
import { fetchFeaturedImgs } from "../modules/Home-page-modules/fetch-featured-images";

function Home() {
  const { isLoading, error, data } = fetchPost();

  const { data: categories } = fetchCategories(data);

  const { data: featuredImages } = fetchFeaturedImgs();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (categories) {
    return (
      <>
        <div className="row p-5">
          {data &&
            data.map((post) => {
              const categoryNames = [];
              post.categories.forEach((categoryId) => {
                const category = categories.find(
                  (category) => category.id === categoryId
                );
                if (category) {
                  categoryNames.push(category.name);
                }
              });

              const featuredImage = featuredImages.find(
                (image) => image.id === post.featured_media
              );
              return (
                <div key={post.id} className="col-md-4 mt-5">
                  <div className="card custom-card" style={{ border: "none" }}>
                    <div className="card-body">
                      {featuredImage && (
                        <img
                          src={featuredImage.source_url}
                          className="card-img-top"
                        />
                      )}
                      <p className="card-text homePage-category category">
                        {categoryNames.join(" | ")}
                      </p>
                      <h2 className="card-title homePage-title">
                        {post.title.rendered}
                      </h2>
                      <p className="card-text">{formatDate(post.date)}</p>
                      <div
                        className="card-text"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      ></div>
                      <div className="link">
                        <Link to={"/" + post.slug} className="card-link">
                          Read More
                        </Link>
                        <ArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default Home;
