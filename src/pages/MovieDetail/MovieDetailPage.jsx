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
  const [movieReviewsLoading, setMovieReviewsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  // const [iconImage, setIconImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const imageUrls = [
    'https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PU_twGbYm8QYDk-bf0UPGqVrjbqQEXoL35oXW2IF1QL7F9OHBkgEUUdR_wY_lpqBsI0&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68vwQkwD5C04gE4MMlKkCMY2qyOcF5ZWboA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST6q40unYXgnmZboEu-0pt9SoDz4rX_3FZcg&s',
    'https://dthezntil550i.cloudfront.net/ps/latest/ps2201272314365330022817814/1280_960/56cf6ec5-7084-48e1-a543-79b1d5908eab.png',
    'https://i.pinimg.com/236x/40/35/b1/4035b1891b777ee370fb48fbc6cada7a.jpg',
    'https://i.pinimg.com/236x/94/dd/25/94dd25f3692ecd605d0d3156e9cf7171.jpg',
    'https://i.pinimg.com/originals/48/06/65/4806655144635765866e5b1361d4a9c0.jpg',
    'https://i.pinimg.com/236x/d6/4e/97/d64e9765deca662e8fa07d2cfdb67f7c.jpg',
    'https://i.pinimg.com/236x/d9/57/04/d957041fe6b8ad090e7c34bd6431e34b.jpg',
    'https://i.pinimg.com/236x/86/dc/fe/86dcfe8959960d3d75ef5f3d880e69e1.jpg',
  ];

  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const urlForVideo = `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`;
  const urlForReviews = `https://api.themoviedb.org/3/movie/${id}/reviews`;
  const urlForRecommendations = `https://api.themoviedb.org/3/movie/${id}/recommendations`;

  const fetchMovieReviews = async () => {
    try {
      const response = await fetch(urlForReviews, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const json = await response.json();

      // 리뷰 데이터에 랜덤 이미지 추가
      const reviewsWithImages = json.results.map(review => ({
        ...review,
        iconImage: getRandomImage(), // 랜덤 이미지 추가
      }));

      setMovieReviews(reviewsWithImages);
      // setMovieReviews(json.results);
      setMovieReviewsLoading(false);
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
      setMovieReviewsLoading(false);
    }
  };

  // 랜덤 이미지를 가져오는 함수
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  useEffect(() => {
    // setIconImage(getRandomImage()); 

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

    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(urlForRecommendations, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const json = await response.json();
        setRecommendedMovies(json.results); // Set the recommended movies in state
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
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
    fetchMovieReviews();
    fetchRecommendedMovies();
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

  const toggleReview = (id) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderStars = (rating) => {
    const starCount = Math.round(rating / 2); // TMDb rating is out of 10, we want 5 stars
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < starCount ? 'filled-star' : 'empty-star'}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}Y ${month}M ${day}DAY`;
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
                {movie.poster_path ? (
                  <div 
                    className='movie-card-box'
                    style={{
                      backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
                    }}
                  >
                </div>
                ) : (
                  <div className='movie-card-box'>No Image</div>
                )}
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
        <div className='section sec-04'>
          <h3>📖 Reviews!</h3>
          <div className="review-wrap">
            {movieReviews.length > 0 ? (
              movieReviews.map((review) => {
                const isExpanded = expandedReviews[review.id];
                const reviewContent = isExpanded ? review.content : review.content.slice(0, 300);
                const showMoreButton = review.content.length > 300;
                const rating = review.author_details?.rating;
                const reviewDate = review.created_at;

                return (
                  <div key={review.id} className="review-box">
                    <div className="review-box-top">
                      <div className="icon-author">
                        {/* <img src={iconImage} alt='Author Icon' /> */}
                        {/* <img src={randomIconImage} alt='Author Icon' /> */}
                        <img src={review.iconImage} alt='Author Icon' />
                      </div>
                      <h5>{review.author}</h5>
                      {rating && (
                        <div className="review-rating">{renderStars(rating)}</div>
                      )}
                      <p className="review-date">{formatDate(reviewDate)}</p>
                    </div>
                    <div className="review-cont-box">
                      <p>{reviewContent}</p>
                      {showMoreButton && (
                        <button onClick={() => toggleReview(review.id)}>
                          {isExpanded ? '👆 Show less' : '👇 Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No reviews available 🥲</p>
            )}
          </div>
        </div>
        <div className='section sec-05'>
          <h3>🎬 Recommend</h3>
          <div className="recommend-wrap">
          {recommendedMovies.length > 0 ? (
            <Row>
              {recommendedMovies.map(movie => (
                <Col key={movie.id} lg={3} xs={6} className="recommend-box">
                  <div
                    className="recommend-card"
                    style={{
                      backgroundImage: movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`
                        : 'url(/path-to-default-image)', // Fallback image if no poster is available
                    }}
                  ></div>
                  <p>{movie.title}</p>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No recommended movies available 🥲</p>
          )}
        </div>
        </div>
      </Container>
    </div>
  )
}

export default MovieDetailPage
