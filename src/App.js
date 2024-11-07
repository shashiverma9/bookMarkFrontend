import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/common/NavBar/Navbar';
import BookmarkList from './components/common/BookMarkList/BookmarkList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookmarks" element={<BookmarkList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>

  );
}

export default App;
