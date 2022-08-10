import React from 'react';
import { useState } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import * as API from 'services';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { useEffect } from 'react';
import { useRef } from 'react';

export function ImageGallery({ searchQuery }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  // const isFirstRender = useRef(true);

  useEffect(() => {
    setData([]);
    setPage(1);
    setError(null);
    setLoader(false);
    setShowModal(false);
    setModalInfo(null);
  }, []);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.searchQuery !== this.props.searchQuery ||
  //     prevState.page !== this.state.page
  //   ) {
  //     if (prevProps.searchQuery !== this.props.searchQuery) {
  //       this.setState({ data: [] });
  //     }
  // const query = this.props.searchQuery;
  // this.setState({ loader: true });

  // API.getImages(query, this.state.page)
  //   .then(response =>
  //     this.setState(prevState => {
  //       return {
  //         data: [...prevState.data, ...response.hits],
  //       };
  //     })
  //   )
  //   .catch(error => this.setState({ error }))
  //   .finally(() => this.setState({ loader: false }));
  //   }
  //   if (this.state.page > 1) {
  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   }
  // }

  useEffect(() => {
    // useEffect(() => {
    //   setData([]);
    // }, [searchQuery]);
    const query = searchQuery;
    if (query === '') {
      return;
    }
    setLoader(true);

    API.getImages(query, page)
      .then(response => setData(prevData => [...prevData, ...response.hits]))
      .catch(error => setError({ error }))
      .finally(() => setLoader(false));
  }, [page, searchQuery]);

  // if (page > 1) {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }

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
