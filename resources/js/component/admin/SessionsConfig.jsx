import React, {useState, useEffect} from 'react';
import {nanoid} from "nanoid";

const SessionsConfig = ({halls, popupAddFilmHandler, popupAddShowtimeHandler, popupDeleteShowtimeHandler}) => {
    const [films, setFilms] = useState([]);
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        axios.get('/api/getFilms', {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => setFilms(response.data))
            .then(() => {
                axios.get('/api/getGrid', {headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }})
                    .then(response => setGrid(response.data));
            });

    }, []);


    return (
        <section className="conf-step">
            <header className="conf-step__header conf-step__header_opened">
                <h2 className="conf-step__title">Сетка сеансов</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">
                    <button
                        onClick={popupAddFilmHandler}
                        className="conf-step__button conf-step__button-accent"
                    >Добавить фильм</button>
                </p>
                <div className="conf-step__movies">
                    {films.map(film => (
                        <div
                            key={film.id}
                            onClick={popupAddShowtimeHandler.bind(this, film)}
                            className="conf-step__movie">
                            <img className="conf-step__movie-poster" alt="poster" src={film.poster} />
                            <h3 className="conf-step__movie-title">{film.name}</h3>
                            <p className="conf-step__movie-duration">{film.duration} минут</p>
                        </div>
                    ))}
                </div>

                <div className="conf-step__seances">
                    {halls.map(hall => (
                        <div key={hall.id} className="conf-step__seances-hall">
                            <h3 className="conf-step__seances-title">Зал {hall.id}</h3>
                            <div className="conf-step__seances-timeline">
                                {grid.map(film => {
                                    if(film.hall === hall.id) {
                                        return (
                                            <div
                                                onClick={popupDeleteShowtimeHandler.bind(this, film.id, films.find((elem, idx, halls) => elem.id === Number(film.film)).name)}
                                                key={nanoid()}
                                                className="conf-step__seances-movie">
                                                <p className="conf-step__seances-movie-title">
                                                    {films.find((elem, idx, halls) => elem.id === Number(film.film)).name}
                                                </p>
                                                <p className="conf-step__seances-movie-start">{film.time}</p>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SessionsConfig;
