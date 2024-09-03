import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComingMovie';
import MovieCard from '../MovieCard/MovieCard';
import './UpComingMovieSlide.style.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const UpComingMovieSlide = (props) => {
    const {data, isLoading, isError, error } = useUpComingMoviesQuery();


    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div className='upcoming-movie-slide-wrap'>
            <h3 className='movie-slide-tit side-p'>Up Coming Movies</h3>
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
                    {data.data.results.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
            </Carousel>
        </div>
    )
};

export default UpComingMovieSlide;
