import React from 'react';
import { useState } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import * as API from 'services';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { useEffect } from 'react';

export function ImageGallery({ searchQuery }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    setData([]);
    setPage(1);
    setError(null);
    setLoader(false);
    setShowModal(false);
    setModalInfo(null);
  }, []);

  useEffect(() => {
    setData([]);
  }, [searchQuery]);

  useEffect(() => {
    const query = searchQuery;
    if (query === '') {
      return;
    }
    setLoader(true);

    API.getImages(query, page)
      .then(response => setData(prevData => [...prevData, ...response.hits]))
      .then(() => {
        if (page > 1) {
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }
      })
      .catch(error => setError({ error }))
      .finally(() => {
        setLoader(false);
      });
  }, [page, searchQuery]);

  const handleItemClick = (id, largeImageURL, tags) => {
    setShowModal(true);
    setModalInfo({ id, largeImageURL, tags });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      <ul className={css.ImageGallery}>
        {data &&
          data.map(item => (
            <ImageGalleryItem
              data={item}
              key={item.id}
              onClick={handleItemClick}
            />
          ))}
      </ul>
      {loader && <Loader />}
      {data.length > 0 && <Button onClick={handleBtnClick} />}
      {showModal && <Modal showModal={modalInfo} closeModal={closeModal} />}
    </>
  );
}
