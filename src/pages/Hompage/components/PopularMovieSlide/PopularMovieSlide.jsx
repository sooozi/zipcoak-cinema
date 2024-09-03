import React from 'react';
import Alert from 'react-bootstrap/Alert';
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';

const PopularMovieSlide = (props) => {
    const {data, isLoading, isError, error } = usePopularMoviesQuery();


    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div className='popular-movie-slide-wrap'>
            <MovieSlider
                title='Popular Movies'
                movies={data.data.results}
                responsive={responsive}
            />
        </div>
    )
};

export default PopularMovieSlide;
