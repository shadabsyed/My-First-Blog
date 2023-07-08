import React from "react";
import { useParams } from "react-router-dom";

const SameCategPosts = () => {
  const { category_slug } = useParams();
  console.log(useParams());

  return <div>You are on {category_slug} archive</div>;
};

export default SameCategPosts;
