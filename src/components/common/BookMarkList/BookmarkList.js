import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Popup from '../PopUp';
import './index.css';

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupType, setPopupType] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/bookmarks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarks(response.data);
      } catch (error) {
        console.error('Error fetching bookmarks', error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/bookmarks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
      closeModal();
    } catch (error) {
      console.error('Error deleting bookmark', error);
    }
  };

  const openAddPopup = () => {
    setPopupTitle('Add Bookmark');
    setPopupType('add');
    setSelectedBookmark(null);
    setPopupOpen(true);
  };

  const openEditPopup = (bookmark) => {
    setPopupTitle('Edit Bookmark');
    setPopupType('edit');
    setSelectedBookmark(bookmark);
    setPopupOpen(true);
  };

  const openDeletePopup = (bookmark) => {
    setPopupTitle('Delete Bookmark');
    setPopupType('delete');
    setSelectedBookmark(bookmark);
    setPopupOpen(true);
  };

  const closeModal = () => {
    setPopupOpen(false);
    setSelectedBookmark(null);
  };

  const handleSave = async (bookmarkData) => {
    const token = localStorage.getItem('token');
    try {
      if (popupType === 'edit' && selectedBookmark) {
        const response = await axios.put(`http://localhost:5000/bookmarks/${selectedBookmark._id}`, bookmarkData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarks(bookmarks.map(bm => bm._id === selectedBookmark._id ? response.data.bookmark : bm));
      } else if (popupType === 'add') {
        const response = await axios.post('http://localhost:5000/bookmarks/add', bookmarkData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarks([...bookmarks, response.data.bookmark]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving bookmark', error);
    }
  };

  return (
    <div className="bookmark-list-container">
      <h2>Your Bookmarks</h2>
      <button className="add-bookmark-btn" onClick={openAddPopup}>
        <FontAwesomeIcon icon={faPlus} /> Add Bookmark
      </button>
      <ul>
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="bookmarkList-wrapper">
            <li>
              <img src={bookmark.image} alt={bookmark.title} />
              <h3>{bookmark.title}</h3>
              <p>{bookmark.description}</p>
              <p>Tags: {bookmark.tags.join(', ')}</p>
              <p>URL: <a href={bookmark.url}>{bookmark.url}</a></p>
              <div className="bookmark-actions">
                <button onClick={() => openEditPopup(bookmark)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => openDeletePopup(bookmark)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <Popup
        show={popupOpen}
        title={popupTitle}
        type={popupType}
        bookmark={selectedBookmark}
        onSave={handleSave}
        onCancel={closeModal}
        onDelete={() => handleDelete(selectedBookmark._id)}
      />
    </div>
  );
};

export default BookmarkList;
