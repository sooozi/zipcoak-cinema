import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComingMovie';

const UpComingMovieSlide = (props) => {
    const {data, isLoading, isError, error } = useUpComingMoviesQuery();

    if(isLoading) {
        return(
          <div className='spinner-area'>
            <Spinner
              animation="border"
              sytle={{width:"5rem", height:"5rem"}}
            />
          </div>
        )
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div className='upcoming-movie-slide-wrap'>
            <MovieSlider
                title='Up Coming Movies'
                movies={data.data.results}
                responsive={responsive}
            />
        </div>
    )
};

export default UpComingMovieSlide;
