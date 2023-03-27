import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import pixabayAPI from "./services/pixabay-api";

const Status = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isNewSearch, setIsNewSearch] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isNewSearch === true) {
      setPage(1);
      setImages([]);
      setStatus(Status.PENDING);

      setTimeout(() => {
        pixabayAPI
          .getImages(keyword, page)
          .then((images) => {
            setImages(images.hits);
            setStatus(Status.RESOLVED);
          })
          .catch((error) => {
            setError(error);
            setStatus(Status.REJECTED);
          });
      }, 1000);
    }

    if (isNewSearch === false) {
      setStatus(Status.PENDING);

      pixabayAPI
        .getImages(keyword, page)
        .then((images) => {
          setImages(
            (prevImages) => prevImages && [...prevImages, ...images.hits]
          );
          setStatus(Status.RESOLVED);
        })
        .catch((error) => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [keyword, page, isNewSearch]);

  const onSearch = (keyword) => {
    console.log("onsearch");
    setKeyword(keyword);
    setIsNewSearch(true);
  };

  const loadMore = () => {
    console.log("load");

    setPage((prevPage) => prevPage + 1);
    setIsNewSearch(false);
  };

  return (
    <div className="App">
      <Searchbar search={onSearch} />
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <>
          <ImageGallery images={images} />
          <Button onLoadMore={loadMore} />
        </>
      )}
      {status === Status.REJECTED && <div>{error.message}</div>}
    </div>
  );
};

export default App;
