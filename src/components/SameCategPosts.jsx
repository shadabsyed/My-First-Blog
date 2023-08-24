import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import { Link } from "react-router-dom";

// Components
import ArrowRight from "./ArrowRight";

// Modules
import fetchCategIdByCategSlug from "../modules/SameCategPosts-page-modules/fetch-categId-by-categSlug";
import fetchPostsByCategId from "../modules/SameCategPosts-page-modules/fetch-posts-by-categId";
import fetchCategoryName from "../modules/SameCategPosts-page-modules/fetch-categoryName";
import fetchFdImg from "../modules/SameCategPosts-page-modules/fetch-featuredImg";
import fetchAuthorName from "../modules/SameCategPosts-page-modules/fetch-authorName";
import SameCategPostsPagination from "./SameCategPostsPagination";

const SameCategPosts = () => {
  const { category_slug, pageNumber } = useParams();

  const initialPageNumber = parseInt(pageNumber);

  /**
   *  fethcing catgeory id by categroy slug
   */

  const { data: categorySlugData } = fetchCategIdByCategSlug(category_slug);

  const categoryId = categorySlugData?.[0]?.id;

  /**
   *   fetcing posts by category id
   */

  const [currentPage, setCurrentPage] = useState(
    isNaN(initialPageNumber) ? 1 : initialPageNumber
  );

  useEffect(() => {
    document.title = `${category_slug}`;
    setCurrentPage(isNaN(initialPageNumber) ? 1 : initialPageNumber);
  }, [initialPageNumber]);

  const [totalPages, setTotalPages] = useState(1);

  const { data: categoryData } = fetchPostsByCategId(categoryId, currentPage);

  const categoryPosts = categoryData?.data;

  // console.log(categoryData?.headers?.get("x-wp-totalpages"));

  // step for pagination

  useEffect(() => {
    setTotalPages(categoryData?.headers?.get("x-wp-totalpages"), 10);
  }, [categoryData]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  /**
   *  fetching category name by category id
   */

  const { data: categoryName } = fetchCategoryName(categoryId);

  /**
   *  fetching featured img
   */

  const featuredImg = categoryPosts?.[0]?.featured_media;

  const { data: FimageData } = fetchFdImg(featuredImg);

  const img = FimageData?.source_url;

  /**
   *   fetching author name
   */

  const authorId = categoryPosts?.[0]?.author;

  const { data: authorData } = fetchAuthorName(authorId);

  const authorName = authorData?.name;

  /**
   *  Displaying fetched data
   */

  return (
    <>
      <div className="categorySlugCont">
        <p className="categorySlug">{category_slug}</p>
      </div>
      <div className="row p-4">
        {categoryPosts?.map((post) => (
          <div key={post.id} className="col-md-4 mt-4">
            <div className="card custom-card" style={{ border: "none" }}>
              <Link to={"/" + post.slug}>
                {" "}
                {img && <img src={img} className="card-img-top" />}
              </Link>
              <div className="card-body">
                {categoryName && (
                  <p className="category samecateg-category">
                    {categoryName?.name}
                  </p>
                )}
                <h2>
                  <Link
                    to={"/" + post.slug}
                    className="card-title samecateg-title"
                  >
                    {post.title.rendered}{" "}
                  </Link>
                </h2>

                <p className="card-text">
                  {" "}
                  by {authorName} <span className="dot"></span>{" "}
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
        ))}
      </div>
      <SameCategPostsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        category_slug={category_slug}
      />
    </>
  );
};

export default SameCategPosts;
