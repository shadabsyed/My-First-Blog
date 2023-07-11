import React, { useEffect } from "react";
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

const SameCategPosts = () => {
  useEffect(() => {
    document.title = "SameCategPosts Page";
  }, []);

  const { category_slug } = useParams();

  /**
   *  fethcing catgeory id by categroy slug
   */

  const { data: categorySlugData } = fetchCategIdByCategSlug(category_slug);

  const categoryId = categorySlugData?.[0]?.id;

  /**
   *   fetcing posts by category id
   */

  const { data: categoryPosts } = fetchPostsByCategId(categoryId);

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
              {img && <img src={img} className="card-img-top" />}
              <div className="card-body">
                <h2 className="card-title">{post.title.rendered}</h2>
                {categoryName && <p>{categoryName?.name}</p>}

                {authorName && <p>{authorName}</p>}

                <p>{formatDate(post.date)}</p>
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                ></div>
                <Link to={"/" + post.slug} className="card-link">
                  Read More
                </Link>
                <ArrowRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SameCategPosts;
