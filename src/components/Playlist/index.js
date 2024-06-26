import React, { useContext } from 'react';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Navbar from '../Navbar';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css';

const Playlist = () => {
  const { playlist, removeFromPlaylist } = useContext(PlaylistContext);

  const handleRemoveFromPlaylist = (movie) => {
    removeFromPlaylist(movie);
    toast.success(`${movie.Title} removed from playlist successfully!`);
  };

  return (
    <div>
      <Navbar />
      <div className='playlist-sidebar-container'>
        <Sidebar>
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: '#13395e',
                  color: '#b6c8d9',
                },
              },
            }}
          >
            <MenuItem component={<Link to="/" />}>Home</MenuItem>
            <MenuItem component={<Link to="/playlist" />}>MovieList</MenuItem>
          </Menu>
        </Sidebar>
        <div className="playlist-container">
          <h1 className='your-playlist-heading'>Your MovieList</h1>
          {playlist.length === 0 ? (
            <p className='no-movies-text'>
              No movies in your MovieList. 
              <Link to="/" className="add-movies-link">Add some!</Link>
            </p>
          ) : (
            <ul className='playlist-list-container'>
              {playlist.map((movie, index) => (
                <li key={index} className="playlist-item">
                  <div className="playlist-movie-details">
                    <Link to={`/movies/${movie.imdbID}`} className="link">
                      <img src={movie.Poster} alt={movie.Title} className="playlist-poster" />
                    </Link>
                    <div className='button-container'>
                      <h3 className="movie-title">{movie.Title}</h3>
                      <button onClick={() => handleRemoveFromPlaylist(movie)} className="remove-button">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
