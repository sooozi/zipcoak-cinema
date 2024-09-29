import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopMovieSlide from './components/TopMovieSlide/TopMovieSlide';
import UpComingMovieSlide from './components/UpComingMovieSlide/UpComingMovieSlide';
import './Homepage.style.css';

const Homepage = () => {
  return (
    <div className="container-wrap-wide HomePage-area">

      <Banner />

      <div className="slides-cont">
        <PopularMovieSlide />
        <TopMovieSlide />
        <UpComingMovieSlide />
      </div>
      
    </div>
  )
}

export default Homepage
