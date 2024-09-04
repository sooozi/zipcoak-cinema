import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import 'react-multi-carousel/lib/styles.css';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';

const MoviesPage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({keyword});

  if(isLoading) {
    return(
      <div className='spinner-area'>
        <Spinner
          animation="border"
          variant="danger"
          sytle={{width:"5rem", height:"5rem"}}
        />
      </div>
    )
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
}

  return (
    <div className="container-wrap MoviesPage-wrap">
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            {" "}
            필터{" "}
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviesPage
