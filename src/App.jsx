import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Home from "./components/Home";
import Saved from "./components/Saved";

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("nature");
  const [loader, setLoader] = useState(true);
  const [saved, setSaved] = useState([]);

  console.log("img saved", saved);
  const API_KEY = "vQ3N7ZxQmQiPRiAjUkJFHTi6of1gy8d2tPs49PjXedolupj7ElRsZ2tS";
  useEffect(() => {
    const fetchImage = async () => {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${search}&per_page=80`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      setImages(res.data.photos);
      setLoader(false);
    };

    const data = JSON.parse(localStorage.getItem("Images"));
    if (data) {
      setSaved(data);
    }

    fetchImage();
  }, [search]);

  useEffect(() => {
    if (saved.length != 0) {
      const json = JSON.stringify(saved);
      localStorage.setItem("Images", json);
    }
  }, [saved]);

  return (
    <>
      <Router>
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                images={images}
                loader={loader}
                saved={saved}
                setSaved={setSaved}
              />
            }
          />
          <Route
            path="/saved"
            element={<Saved saved={saved} loader={loader} />}
          />
        </Routes>
      </Router>
    </>
  );
};
export default App;
