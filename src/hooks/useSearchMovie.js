// import { useQuery } from "@tanstack/react-query";
// import api from '../utils/api';

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

import { useQuery } from "@tanstack/react-query";
import api from '../utils/api';

// API 요청을 위한 함수 수정
const fetchSearchMovie = ({ keyword, page, genre, rating, releaseYear }) => {
    // 기본 쿼리 문자열을 생성
    let query = `/movie/popular?page=${page}`;

    if (keyword) {
        query = `/search/movie?page=${page}&query=${encodeURIComponent(keyword)}`;
    }
    if (genre) {
        query += `&genre=${encodeURIComponent(genre)}`;
    }
    if (rating) {
        query += `&rating=${encodeURIComponent(rating)}`;
    }
    if (releaseYear) {
        query += `&releaseYear=${encodeURIComponent(releaseYear)}`;
    }

    return api.get(query);
};

// 훅에서 필터 파라미터를 포함하도록 수정
export const useSearchMovieQuery = ({ keyword, page, genre, rating, releaseYear }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, page, genre, rating, releaseYear],
        queryFn: () => fetchSearchMovie({ keyword, page, genre, rating, releaseYear }),
        select: (result) => result.data,
    });
};