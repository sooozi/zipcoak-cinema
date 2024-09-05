import { useQuery } from "@tanstack/react-query";
import api from '../utils/api';

// const fetchSearchMovie = ({ keyword, page }) => {
//     return keyword
//         ? api.get(`/search/movie?query=${keyword}&page=${page}`)
//         : api.get(`/movie/popular?page=${page}`) ;
// }

// export const useSearchMovieQuery = ({ keyword, page }) => {
//     return useQuery({
//         queryKey: ['movie-search', keyword, page],
//         queryFn: () => fetchSearchMovie({ keyword, page }),
//         select: (result) => result.data,
//     });
// };

const fetchSearchMovie = ({ keyword, page, category }) => {
    if (keyword) {
        return api.get(`/search/movie?query=${keyword}&page=${page}`);
    }

    switch (category) {
        case 'nowplaying':
            return api.get(`/movie/now_playing?page=${page}`);
        case 'popular':
            return api.get(`/movie/popular?page=${page}`);
        case 'toprated':
            return api.get(`/movie/top_rated?page=${page}`);
        case 'upcoming':
            return api.get(`/movie/upcoming?page=${page}`);
        default:
            return api.get(`/movie/popular?page=${page}`); // Default to popular movies
    }
};

export const useSearchMovieQuery = ({ keyword, page, category }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, page, category],
        queryFn: () => fetchSearchMovie({ keyword, page, category }),
        select: (result) => result.data,
    });
};
