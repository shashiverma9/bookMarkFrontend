import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Dashboard.css';

const Dashboard = () => {
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
    <div className="dashboard">
      <h2>Your Bookmarks</h2>
      <div className="bookmark-list">
        {bookmarks && bookmarks.length &&  bookmarks.map(bookmark => (
          <div key={bookmark._id} className="bookmark-card">
            <img src={bookmark.image} alt={bookmark.title} />
            <h3>{bookmark.title}</h3>
            <p>{bookmark.description}</p>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
