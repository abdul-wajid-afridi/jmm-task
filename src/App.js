import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./componets/SideBar";
import Home from "./pages/Home";

const App = () => {
  return (
    <section className="flex">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
