import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
