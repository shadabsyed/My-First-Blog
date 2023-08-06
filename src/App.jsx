import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import SameCategPosts from "./components/SameCategPosts";
import Pagination from "./components/Pagination";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:post_slug" element={<SinglePost />}></Route>
        <Route
          path="/category/:category_slug"
          element={<SameCategPosts />}
        ></Route>
        <Route path="/page/:pageNumberParam" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
