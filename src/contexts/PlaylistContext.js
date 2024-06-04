import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create the context
export const PlaylistContext = createContext();

// Create the context provider
export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  // Load playlist from local storage on initial render
  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  // Save playlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  // Function to add a movie to the playlist
  const addToPlaylist = (movie) => {
    if (playlist.some((m) => m.imdbID === movie.imdbID)) {
      toast.error("Movie is already in the playlist!", { position: "top-center" });
      return;
    }
    setPlaylist((prevPlaylist) => [...prevPlaylist, movie]);
    toast.success("Movie added to playlist!", { position: "top-center" });
  };

  // Function to remove a movie from the playlist
  const removeFromPlaylist = (movie) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((m) => m.imdbID !== movie.imdbID));
    toast.success("Movie removed from playlist!", { position: "top-center" });
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
