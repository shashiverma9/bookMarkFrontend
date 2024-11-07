import React, { useState, useEffect } from 'react';
import './index.css';

const Popup = ({ show, title, type, bookmark, onSave, onCancel, onDelete }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (bookmark) {
      setUrl(bookmark.url || '');
    }
  }, [bookmark]);

  const handleSave = () => {
    if (type === 'delete') {
      onDelete();
    } else {
      onSave({ url });
    }
  };

  return (
    show && (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>{title}</h2>
          {type !== 'delete' && (
            <input
              type="url"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          )}
          {type === 'delete' && (
            <p>Are you sure you want to delete this bookmark?</p>
          )}
          <div className="popup-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
