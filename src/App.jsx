import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:slug" element={<SinglePost />}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
