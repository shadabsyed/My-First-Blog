import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import SameCategPosts from "./components/SameCategPosts";
import SameCategPostsPagination from "./components/SameCategPostsPagination";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:post_slug" element={<SinglePost />}></Route>
        <Route
          path="/category/:category_slug/"
          element={<SameCategPosts />}
        ></Route>
        <Route path="/page/:pageNumberParam" element={<Home />} />
        <Route
          path="/category/:category_slug/page/:pageNumber"
          element={<SameCategPosts />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
