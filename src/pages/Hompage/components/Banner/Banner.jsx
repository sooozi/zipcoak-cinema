import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log(data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div
            style={{
                backgroundImage:`url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data.data.results[0].poster_path})`,
            }}
            className='banner'
        >
            <div className='side-p banner-txt-box'>
                <h3>{data.data.results[0].original_title}</h3>
                <p>{data.data.results[0].overview}</p>
            </div>
        </div>
    );
}

export default Banner;