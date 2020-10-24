import React, { useEffect, useState } from 'react';
import Movie from "./Movie";
import axios from "axios";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    const getTodayFilms = (year, month, day) => {
        axios.get('/api/cinema/films/' + year + '/' + month + '/' + day)
            .then(response => setMovies(response.data))
    }

    useEffect(() => {
        getTodayFilms(2020,10,30);
    }, []);

    return (
        <>
            {Object.entries(movies).map(movie => (<Movie key={movie[0]} {...movie} />))}
        </>
    );
};

export default Movies;
