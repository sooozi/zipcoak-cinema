import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';

const MovieCard = ({movie}) => {
  return (
    <div className='movie-card-wrap'>
        <div className='movie-card-box' style={{backgroundImage:`url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,}}>
            <div className='movie-card-overlay'>
              <h5 className='movie-card-tit'>{movie.title}</h5>
              {movie.genre_ids.map((id) => {
                  <Badge bg="danger">{id}</Badge>
              })}
              <div>{movie.vote_average}</div>
              <div>{movie.popularity}</div>
              <div>{movie.adult ? "OVER 18" : "UNDER 18"}</div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard
