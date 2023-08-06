import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Componenets
import ArrowRight from "./ArrowRight";
import PaginationContainer from "./PaginationContainer";
// Modules
import { fetchCategories } from "../modules/Home-page-modules/fetch-categories";
import { fetchFeaturedImgs } from "../modules/Home-page-modules/fetch-featured-images";
import { fetchAuthorName } from "../modules/Home-page-modules/fetch-author-name";
import { formatDate } from "../modules/formatDate";
import fetchPosts from "../modules/Home-page-modules/fetch_posts";

function Home() {
  const { pageNumberParam } = useParams();
  const initialPageNumber = parseInt(pageNumberParam);
  const [pageNumber, setPageNumber] = useState(
    isNaN(initialPageNumber) ? 1 : initialPageNumber
  );

  // Fetching all posts

  const { isLoading, error, data } = fetchPosts(pageNumber);

  useEffect(() => {
    document.title = "Home Page";
    setPageNumber(isNaN(initialPageNumber) ? 1 : initialPageNumber);
  }, [initialPageNumber]);

  // fetching category

  const { data: categories } = fetchCategories(data);

  // fetching featured media

  const { data: featuredImages } = fetchFeaturedImgs(data, pageNumber);

  // fetching author name

  const { data: authorData } = fetchAuthorName();

  if (isLoading)
    return (
      <div className="center">
        <div className="loadingio-spinner-ripple-4h8u8pyu3ec">
          <div className="ldio-kp674rbvsx">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  if (categories) {
    return (
      <>
        <div className="row p-5">
          {data &&
            data?.map((post) => {
              const categoryNames = [];
              post.categories.forEach((categoryId) => {
                const category = categories.find(
                  (category) => category.id === categoryId
                );
                if (category) {
                  categoryNames.push(category.name);
                }
              });

              const featuredImage = featuredImages?.find(
                (image) => image.id === post.featured_media
              );

              const authorName = authorData.find(
                (author) => author.id === post.author
              );
              return (
                <div key={post.id} className="col-md-4 mt-5">
                  <div className="card custom-card" style={{ border: "none" }}>
                    {featuredImage && (
                      <Link to={"/" + post.slug}>
                        <img
                          src={featuredImage.source_url}
                          className="card-img-top"
                        />
                      </Link>
                    )}
                    <div className="card-body">
                      <Link to={`/category/${categoryNames[0]}`}>
                        <p className="card-text homePage-category category">
                          {categoryNames.join(" | ")}
                        </p>
                      </Link>
                      <h2>
                        <Link
                          to={"/" + post.slug}
                          className="card-title homePage-title"
                        >
                          {" "}
                          {post.title.rendered}
                        </Link>
                      </h2>
                      <p className="card-text">
                        {" "}
                        by {authorName.name} <span className="dot"></span>{" "}
                        {formatDate(post.date)}
                      </p>
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
        <PaginationContainer
          totalPages={40}
          currentPage={pageNumber}
          onPageChange={(page) => setPageNumber(page)}
        />
      </>
    );
  }
}

export default Home;
