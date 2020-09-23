import React from 'react';

const Hall = () => {
    return (
        <div className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">Зал 1</h3>
            <ul className="movie-seances__list">
                <li className="movie-seances__time-block"><a className="movie-seances__time"
                                                             href="hall.html">10:20</a></li>
                <li className="movie-seances__time-block"><a className="movie-seances__time"
                                                             href="hall.html">14:10</a></li>
                <li className="movie-seances__time-block"><a className="movie-seances__time"
                                                             href="hall.html">18:40</a></li>
                <li className="movie-seances__time-block"><a className="movie-seances__time"
                                                             href="hall.html">22:00</a></li>
            </ul>
        </div>
    );
};

export default Hall;
