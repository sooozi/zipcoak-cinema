import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import './Homepage.style.css';

const Homepage = () => {
  return (
    <div className="container-wrap-wide HomePage-area">
      <Banner />
      <div className="slides-cont">
        <PopularMovieSlide />
      </div>
    </div>
  )
}

export default Homepage
