import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery searchQuery={searchQuery} />

      <ToastContainer autoClose={2000} />
    </div>
  );
}
