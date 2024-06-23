// App.jsx
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/Navbar.jsx';
import YouTube from 'react-youtube';
import BoardOfAffirm from './components/BoardOfAffirm.jsx';

function App() {
  const [page, setPage] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const navigateToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="bg-blue-500 min-h-screen">
      <div className="bg-pink-200 bg-opacity-80 min-h-screen">
        <div className="flex justify-center">
          <NavBar setPage={navigateToPage} />
        </div>
        <div>
          {page === 1 && (
            <div className="flex flex-col justify-center items-center mt-10">
              <div className="text-2xl text-center mt-10">
                welcome to your own personalized messaging board! (ill have messaging down soon baby)
              </div>
              <div className="relative mt-10">
                {!videoPlaying && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <button
                      onClick={handlePlayVideo}
                      className="bg-white bg-opacity-75 rounded-full p-4"
                    >
                      <svg
                        className="w-12 h-12 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11.5v5l4-2.5-4-2.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <YouTube
                  videoId="CmGw-DBcP98" // Replace with your YouTube video ID
                  opts={opts}
                  onPlay={() => setVideoPlaying(true)}
                />
              </div>
            </div>
          )}
          {page === 2 && (
            <div>
              <BoardOfAffirm />
            </div>
          )}
          {page === 3 && (
            <div>
              This is page 3.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
