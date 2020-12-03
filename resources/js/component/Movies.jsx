import React, { useEffect, useState } from 'react';
import Movie from "./Movie";
import axios from "axios";

const Movies = ({today}) => {
    const [movies, setMovies] = useState([]);

    const getTodayFilms = (year, month, day) => {
        axios.get('/api/cinema/films/' + year + '/' + month + '/' + day)
            .then(response => setMovies(response.data))
    }

    useEffect(() => {
        switch(today){
            case "1":
                getTodayFilms(2020,11,1);
                break;
            case "2":
                getTodayFilms(2020,11,2);
                break;
            case "3":
                getTodayFilms(2020,11,3);
                break;
            case "4":
                getTodayFilms(2020,11,4);
                break;
            case "5":
                getTodayFilms(2020,11,5);
                break;
            default:
                getTodayFilms(2020,10,30);
        }
    }, [today]);

    return (
        <>
            {Object.entries(movies).map(movie => (<Movie key={movie[0]} {...movie} />))}
        </>
    );
};

export default Movies;
