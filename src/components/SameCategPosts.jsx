import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../modules/formatDate";
import { Link } from "react-router-dom";
import ArrowRight from "./ArrowRight";

const SameCategPosts = () => {
  useEffect(() => {
    document.title = "SameCategPosts Page";
  }, []);

  const { category_slug } = useParams();

  const { data: categorySlugData } = useQuery({
    queryKey: ["categorySlugId", category_slug],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/categories?slug=${category_slug}`
      ).then((res) => res.json()),
  });

  const categoryId = categorySlugData?.[0]?.id;

  const { data: categoryPosts } = useQuery({
    queryKey: ["categoryPosts", categoryId],
    queryFn: () =>
      fetch(
        `https://hostplover.com/stest/wp-json/wp/v2/posts?categories=${categoryId}`
      ).then((res) => res.json()),
    enabled: !!categoryId,
  });

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
