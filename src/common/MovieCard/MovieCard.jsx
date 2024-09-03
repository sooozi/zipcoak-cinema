import React from 'react';
import { Badge } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import './MovieCard.style.css';

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card-wrap'>
      <div 
        className='movie-card-box'
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
        }}
      >
        <div className='movie-card-overlay'>
          <h5 className='movie-card-tit'>{movie.title}</h5>
          <Stack className='movie-conts' direction="horizontal" gap={2}>
            <div className='movie-conts-top'>
              {movie.genre_ids.map((id, index) => (
                <Badge bg="danger" key={index}>{id}</Badge> // map 함수가 값을 반환하도록 수정
              ))}
            </div>
            <div className='movie-conts-top'>
              <Badge className='movie-cont' pill bg="primary">
                ⭐ {movie.vote_average}
              </Badge>
              <Badge className='movie-cont' pill bg="secondary">
                💕 {movie.popularity}
              </Badge>
            </div>
            <Badge className='movie-cont cont-adult' pill bg="secondary">
              📛 {movie.adult ? "OVER 18" : "UNDER 18"}
            </Badge>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
