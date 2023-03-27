import React, { useState } from "react";
import s from "./ImageGalleryItem.module.css";
import ImageView from "../ImageView";
import Modal from "../Modal";

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ImageView largeImageURL={largeImageURL} />
        </Modal>
      )}

      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt=""
          className={s.ImageGalleryItemImage}
          onClick={toggleModal}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;
