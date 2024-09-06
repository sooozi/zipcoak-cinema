import React, { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router';

const AppLayout = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchByKeyword = (event) => {
        event.preventDefault();
        //url 교체
        navigate(`/movies?q=${keyword}`);
        setKeyword('');
    }

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) { // Scroll down
                setShowNavbar(false);
            } else { // Scroll up
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', controlNavbar);
    
          // Cleanup function
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          };
        }
      }, [lastScrollY, controlNavbar]);
    
    return (
        <div>
            <Navbar expand="lg" className={`bg-body-tertiary ${showNavbar ? 'nav-visible' : 'nav-hidden'}`}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src="/logo_bl.png" className="App-logo" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/movies">Movies</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event) => setKeyword(event.target.value)}
                            />
                            <Button className="btn-search" variant="outline-primary" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    )
}

export default AppLayout;
