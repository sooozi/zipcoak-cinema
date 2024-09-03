import { useQuery } from "@tanstack/react-query";
import api from '../utils/api';

const fetchTopMovies=()=> {
    return api.get(`/movie/top_rated`)
}

export const useTopMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-top'],
        queryFn:fetchTopMovies
    })
}