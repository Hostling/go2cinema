import React, {useEffect, useState} from 'react';
import Hall from './Hall';
import axios from "axios";
import {nanoid} from "nanoid";

const Movie = (props) => {
    const [info, setInfo] = useState([]);
    const filmId = props[0];
    const halls = {};
    const temp = props[1]
        .filter(item => Number(item.film) === Number(filmId))
        .forEach(item => {
            if(halls[item.hall] !== undefined) {
                halls[item.hall].push(item.time);
            } else {
                halls[item.hall] = [item.time];
            }
        });

    const getFilmInfo = () => {
        axios.get('/api/cinema/filminfo/' + filmId)
            .then(response => setInfo(response.data[0]))
    }

    useEffect(() => {
        getFilmInfo()
    }, []);

    return (
        <section className="movie">
            <div className="movie__info">
                <div className="movie__poster">
                    <img className="movie__poster-image" alt={info.name} src={info.poster} />
                </div>
                <div className="movie__description">
                    <h2 className="movie__title">{info.name}</h2>
                    <p className="movie__synopsis">{info.description}</p>
                    <p className="movie__data">
                        <span className="movie__data-duration">{info.duration} минут</span>
                        <br/>
                        <span className="movie__data-origin">{info.country}</span>
                    </p>
                </div>
            </div>
            {Object.entries(halls).map(item => (<Hall key={nanoid()} {...item} />))}
        </section>
    );
};

export default Movie;
