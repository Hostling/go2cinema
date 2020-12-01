import React, {useState, useEffect} from 'react';
import {nanoid} from "nanoid";

const SessionsConfig = ({halls, popupAddFilmHandler, popupAddShowtimeHandler, popupDeleteShowtimeHandler, films, getFilms, grid}) => {
    const [wrap, setWrap] = useState('opened');

    const wrapper = () => wrap === 'opened' ? setWrap('closed'):setWrap('opened');

    useEffect(() => {
        getFilms();
    }, []);

    const delMovieHandler = (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        axios.delete('/api/delMovie/' + id, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(() => getFilms())
    }


    return (
        <section className="conf-step">
            <header
                onClick={wrapper}
                className={'conf-step__header  conf-step__header_' + wrap}>
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
                            className="conf-step__movie">
                            <div
                                data-id={film.id}
                                className="conf-step__seances-del-movie"
                                onClick={delMovieHandler}
                            >X</div>
                            <img
                                className="conf-step__movie-poster" alt="poster" src={film.poster}
                                onClick={popupAddShowtimeHandler.bind(this, film)}
                            />
                            <h3
                                className="conf-step__movie-title"
                                onClick={popupAddShowtimeHandler.bind(this, film)}
                            >{film.name}</h3>
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
