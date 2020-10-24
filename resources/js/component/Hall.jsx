import React from 'react';
import {Link} from 'react-router-dom';
import {nanoid} from "nanoid";

const Hall = (props) => {
    const times = props[1];

    return (
        <div className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">Зал {props[0]}</h3>
            <ul className="movie-seances__list">
                {times.map(item => (
                    <li key={nanoid()} className="movie-seances__time-block">
                        <Link className="movie-seances__time" to="/hall">{item}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Hall;
