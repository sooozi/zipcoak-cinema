import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Hompage/Homepage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Homepage/>}/>
      </Route>

      <Route path="movies">
        <Route index element={<MoviePage/>}/>
        <Route path=":id" element={<MovieDetailPage/>}/>
      </Route>

      <Route path="*" element={<MovieDetailPage/>}/>
    </Routes>
  );
}

export default App;
