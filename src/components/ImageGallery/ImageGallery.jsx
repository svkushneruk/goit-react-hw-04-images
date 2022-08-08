import React from 'react';
import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import * as API from 'services';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    error: null,
    loader: false,
    showModal: false,
    modalInfo: null,
  };

  componentDidMount() {
    this.setState({
      data: [],
      page: 1,
      error: null,
      loader: false,
      showModal: false,
      modalInfo: null,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.page !== this.state.page
    ) {
      if (prevProps.searchQuery !== this.props.searchQuery) {
        this.setState({ data: [] });
      }
      const query = this.props.searchQuery;
      this.setState({ loader: true });

      API.getImages(query, this.state.page)
        .then(response =>
          this.setState(prevState => {
            return {
              data: [...prevState.data, ...response.hits],
            };
          })
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loader: false }));
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleItemClick = (id, largeImageURL, tags) => {
    this.setState({
      showModal: true,
      modalInfo: { id, largeImageURL, tags },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { error, data, loader, showModal, modalInfo } = this.state;
    return (
      <>
        {error && <p>{error.message}</p>}
        <ul className={css.ImageGallery}>
          {data &&
            data.map(item => (
              <ImageGalleryItem
                data={item}
                key={item.id}
                onClick={this.handleItemClick}
              />
            ))}
        </ul>
        {loader && <Loader />}
        {data.length > 0 && <Button onClick={this.handleBtnClick} />}
        {showModal && (
          <Modal showModal={modalInfo} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
