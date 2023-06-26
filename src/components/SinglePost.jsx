import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const SinglePost = () => {
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

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const data = postData[0];

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{data.title.rendered}</h2>
        <p className="card-text">{data.date}</p>
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }}></div>
      </div>
    </div>
  );
};

export default SinglePost;
