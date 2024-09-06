import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieDetailPage.style.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetailPage = () => {
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieVideoLoading, setMovieVideoLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  

  console.log(movie)

  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const urlForVideo = `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const json = await response.json();
        setMovie(json);
        setMovieLoading(false);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setMovieLoading(false);
      }
    };

    const fetchMovieVideo = async () => {
      try {
        const response = await fetch(urlForVideo, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const json = await response.json();
        setMovieVideo(json);
        setMovieVideoLoading(false);
      } catch (error) {
        console.error('Error fetching movie video:', error);
        setMovieVideoLoading(false);
      }
    };

    fetchMovie();
    fetchMovieVideo();
  }, [id]);
  
  if (movieLoading || movieVideoLoading) {
    return <div>Movie is loading...</div>;
  }

  if (!movie) {
    return <div>🥲 Movie not found! 🥲</div>; // movie 데이터가 없는 경우
  }

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="MovieDetailPage-wrap">
      <div 
        className='img-wide-box'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <div className='img-box'>
          <h1>{movie.original_title}</h1>
          <p className='genre-conts'>
            {movie.genres.map((genre, index) => (
              <Badge key={genre.id}>
                {genre.name}{index < movie.genres.length - 1 ? ' ' : ''}
              </Badge>
            ))}
          </p>
        </div>
      </div>
      <Container>
      <div className='section sec-01'>
        <div className='flex-wrap'>
          <div className='flex-box'>
            <span className='cont-icon'>⭐</span>
            <p className='cont-detail'>{movie.vote_average.toFixed(1)}</p>
            <span className='cont-tit'>Rating</span>
          </div>
          <div className='flex-box'>
            {movie.adult ? (
              <span className="age-warning">
                <span className='cont-icon' role="img" aria-label="over 18">📛</span> 
                <span className='cont-detail'>OVER 18</span>
              </span>
            ) : (
              <span className="age-warning">
                <span className='cont-icon' role="img" aria-label="under 18">👨‍👩‍👧‍👦</span>
                <span className='cont-detail'>UNDER 18</span>
              </span>
            )}
            <span className='cont-tit'>Age</span>
          </div>
          <div className='flex-box'>
            <span className='cont-icon'>💕</span>
            <p className='cont-detail'>{movie.popularity}</p>
            <span className='cont-tit'>Popularity</span>
          </div>
        </div>
      </div>
        <div className='section sec-02'>
          <Row className='line-topBtm'>
            <Col lg={4} xs={12}>
              <div className='img-box'>
                <div 
                  className='movie-card-box'
                  style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
                  }}
                >
                </div>
              </div>
            </Col>
            <Col className='cont-detail' lg={8} xs={12}>
              <h2>{movie.title}</h2>
              <div className="cont-box">
                <h4 className="cont-tit">Storyline</h4>
                <p>{movie.overview ? movie.overview : '-'}</p>
              </div>
              <div className="cont-box">
                <h4 className="cont-tit">Release Date</h4>
                <p>{movie.release_date}</p>
              </div>
              <div className="cont-box">
                <h4 className="cont-tit">Runnig Time</h4>
                <p>{movie.runtime} min</p>
              </div>
              <div className="cont-box">
                <h4 className="cont-tit">Budget</h4>
                <p>${formatNumber(movie.budget)}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className='section sec-03'>
          <h3>👀 You have to watch this!</h3>
          <div className="trailer-wrap">
            {movieVideo && movieVideo.results.length > 0 ? (
              <div className="trailer-box">
                <iframe
                  title={movieVideo.results[0].name}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movieVideo.results[0].key}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>Unfortunately, there’s no trailer available 🥲</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MovieDetailPage
