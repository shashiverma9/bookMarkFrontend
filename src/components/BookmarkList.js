import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);

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

  return (
    <div className="bookmark-list-container">
      <h2>Bookmarks</h2>
      <ul>
        {bookmarks && bookmarks.map((bookmark) => (
          <li key={bookmark._id}>
            <img src={bookmark.image} alt={bookmark.title} />
            <h3>{bookmark.title}</h3>
            <p>{bookmark.description}</p>
            <p>Tags: {bookmark.tags.join(', ')}</p>
            <p>URL: <a href={bookmark.url}>{bookmark.url}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
