import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Componenets
import ArrowRight from "./ArrowRight";
// Modules
import { fetchCategories } from "../modules/Home-page-modules/fetch-categories";
import { fetchFeaturedImgs } from "../modules/Home-page-modules/fetch-featured-images";
import { fetchAuthorName } from "../modules/Home-page-modules/fetch-author-name";
import { formatDate } from "../modules/formatDate";
import fetchPosts from "../modules/Home-page-modules/fetch_posts";

function Home() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  fetch(
    "https://hostplover.com/stest/wp-json/wp/v2/posts?page=2&per_page=8"
  ).then((res) => {
    console.log(res.headers);
  });

  // Fetching all posts

  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, error, data } = fetchPosts(pageNumber);

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

        <nav aria-label="Page navigation example" className="nav-cont">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => setPageNumber((page) => page - 1)}
                disabled={pageNumber === 1}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => setPageNumber((page) => page + 1)}
                disabled={pageNumber === 5}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Home;
