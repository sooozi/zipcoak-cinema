import { useQuery } from "@tanstack/react-query";
import api from '../utils/api';

// 장르 ID를 매핑할 객체 추가
const genreIds = {
    action: 28,
    comedy: 35,
    drama: 18
};

const fetchSearchMovie = ({ keyword, page, category, genre }) => {
    let url = '';
    
    if (keyword) {
        url = `/search/movie?query=${keyword}&page=${page}`;
    } else {
        switch (category) {
        case 'nowplaying':
            url = `/movie/now_playing?page=${page}`;
            break;
        case 'popular':
            url = `/movie/popular?page=${page}`;
            break;
        case 'toprated':
            url = `/movie/top_rated?page=${page}`;
            break;
        case 'upcoming':
            url = `/movie/upcoming?page=${page}`;
            break;
        default:
          url = `/movie/popular?page=${page}`; // 기본적으로 인기 영화를 가져옵니다
        }
    }
    
    if (genre) {
        const genreId = genreIds[genre];
        if (genreId) {
            url += `&with_genres=${genreId}`; // 장르 ID 파라미터 추가
        }
    }
    
    return api.get(url);
};

export const useSearchMovieQuery = ({ keyword, page, category, genre }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, page, category, genre],
        queryFn: () => fetchSearchMovie({ keyword, page, category, genre }),
        select: (result) => result.data,
    });
};
