import React, { useState } from 'react';
import axios from 'axios';
import './AddBookmark.css';

const AddBookmark = () => {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/bookmarks/add', 
      { url, image, title, description, tags: tags.split(',') }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUrl('');
      setImage('');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      console.error('Error adding bookmark', error);
    }
  };

  return (
    <div className="add-bookmark-container">
      <h2>Add Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBookmark;
