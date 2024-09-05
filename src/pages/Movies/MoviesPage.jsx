import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import 'react-multi-carousel/lib/styles.css';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [category, setCategory] = useState('popular');
  const keyword = query.get("q");
  const filters = {
    keyword,
    page,
    genre,
    rating,
    releaseYear,
  };
  const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page, category});

  const handlePageClick=({selected})=> {
    setPage(selected + 1);
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      setCategory(value); // 카테고리가 변경될 때 state 업데이트
    }

    // if (name === 'category' && value === 'popular') {
    //   window.location.href = '/movies'
    // } else if (name === 'category' && value === 'nowplaying') {
    //   window.location.href = '/now-playing'
    // } else if (name === 'category' && value === 'toprated') {
    //   window.location.href = '/top-rated'
    // } else if (name === 'category' && value === 'upcoming') {
    //   window.location.href = '/upcoming'
    // }

    switch (name) {
      case 'genre':
        setGenre(value);
        break;
      case 'rating':
        setRating(value);
        break;
      case 'releaseYear':
        setReleaseYear(value);
        break;
      default:
        break;
    }
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page when filters are applied
  };

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
            <Form onSubmit={applyFilters}>
              <h5>Filters</h5>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={category}
                  onChange={handleFilterChange}
                >
                  <option value="nowplaying">Now Playing</option>
                  <option value="popular">Popular</option>
                  <option value="toprated">Top Rated</option>
                  <option value="upcoming">Upcoming</option>
                </Form.Control>
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="genre"
                  value={genre}
                  onChange={handleFilterChange}
                >
                  <option value="">All Genres</option>
                  <option value="action">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                </Form.Control>
              </Form.Group> */}
              {/* <Button variant="primary" type="submit">Apply Filters</Button> */}
            </Form>
          </Col>

          <Col lg={8} xs={12}>
            <Row>
              {data?.results.length === 0 ? (
                <Col xs={12}>
                  <Alert variant="warning">No movies found!</Alert>
                </Col>
              ) : (
                data?.results.map((movie, index) => (
                  <Col key={index} lg={4} xs={12}>
                    <MovieCard movie={movie} />
                  </Col>
                ))
              )}
            </Row>
            {data?.results.length > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={data?.total_pages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviesPage
