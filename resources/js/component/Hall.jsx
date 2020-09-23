import React from 'react';
import {Link} from 'react-router-dom';

const Hall = () => {
    return (
        <div className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">Зал 1</h3>
            <ul className="movie-seances__list">
                <li className="movie-seances__time-block">
                    <a className="movie-seances__time"
                                                             href="hall.html">10:20</a></li>
                <li className="movie-seances__time-block">
                    <Link className="movie-seances__time" to="/hall">14:10</Link>
                </li>
                <li className="movie-seances__time-block">
                    <Link className="movie-seances__time" to="/hall">18:40</Link>
                </li>
                <li className="movie-seances__time-block">
                    <Link className="movie-seances__time" to="/hall">22:00</Link>
                </li>
            </ul>
        </div>
    );
};

export default Hall;
