import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlider.style.css';


const MovieSlider = ({title, movies, responsive}) => {
  const navigate = useNavigate();
  
  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`, { state: { movie } }); // movie 데이터를 state로 전달
  };

  return (
    <div className='movie-slider-wrap'>
        <h3 className='movie-slide-tit side-p'>{title}</h3>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={true}
          centerMode={true}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px movie-card-cont"
          >
          {movies.map((movie, index) => (
            <div key={index} onClick={() => handleMovieClick(movie)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Carousel>
    </div>
  )
}

export default MovieSlider
