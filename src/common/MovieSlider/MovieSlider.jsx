import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlider.style.css';

const MovieSlider = ({title, movies, responsive}) => {
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
                {movies.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
        </Carousel>
    </div>
  )
}

export default MovieSlider
