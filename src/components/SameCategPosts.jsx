import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import { Link } from "react-router-dom";
import ArrowRight from "./ArrowRight";
import fetchCategIdByCategSlug from "../modules/SameCategPosts-page-modules/fetch-categId-by-categSlug";
import fetchPostsByCategId from "../modules/SameCategPosts-page-modules/fetch-posts-by-categId";

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
   *  fetching category name by category id
   */

  const { data: categoryName } = useQuery({
    queryKey: ["categoryName", categoryId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/categories/${categoryId}`
      ).then((res) => res.json()),
    enabled: Boolean(categoryId),
  });

  console.log(categoryName);

  /**
   *   fetcing posts by category id
   */

  const { data: categoryPosts } = fetchPostsByCategId(categoryId);

  return (
    <>
      <div className="categorySlugCont">
        <p className="categorySlug">{category_slug}</p>
      </div>
      <div className="row p-4">
        {categoryPosts?.map((post) => (
          <div key={post.id} className="col-md-4 mt-4">
            <div className="card custom-card" style={{ border: "none" }}>
              <div className="card-body">
                <h2 className="card-title">{post.title.rendered}</h2>
                {categoryName && <p>{categoryName?.name}</p>}
                <p>{post.category.name}</p>
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
