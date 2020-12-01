import React, {useState, useEffect } from 'react';
import HallInfo from "./HallInfo";
import HallConfig from "./HallConfig";
import PriceConfig from "./PriceConfig";
import SessionsConfig from "./SessionsConfig";
import OpenSales from "./OpenSales";
import PopupAddHall from "./PopupAddHall";
import PopupDeleteHall from "./PopupDeleteHall";
import PopupAddFilm from "./PopupAddFilm";
import PopupAddShowtime from "./PopupAddShowtime";
import PopupDeleteShowtime from "./PopupDeleteShowtime";

const AdminPage = () => {
    const [halls, setHalls] = useState([]);
    const [addHallActive, setAddHallActive] = useState(false);
    const [deleteHallActive, setDeleteHallActive] = useState(false);
    const [addFilmActive, setAddFilmActive] = useState(false);
    const [addShowtimeActive, setAddShowtimeActive] = useState(false);
    const [deleteShowtimeActive, setDeleteShowtimeActive] = useState(false);
    const [film, setFilm] = useState({});
    const [deleteGridId, setDeleteGridId] = useState("");
    const [deleteShowtimeFilmName, setDeleteShowtimeFilmName] = useState("");
    const [films, setFilms] = useState([]);
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        getHalls();
    }, []);


    const getHalls = () => {
        axios.get('/api/getHalls', {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => setHalls(response.data))
    }

    const getFilms = () => {
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
    }

    const toggleAddHallPopup = (e) => {
        e.preventDefault();
        setAddHallActive(!addHallActive);
    }

    const toggleDeleteHallPopup = (id) => {
        setDeleteHallActive(deleteHallActive ? false : id);
    }

    const toggleAddFilmPopup = (e) => {
        e.preventDefault();
        setAddFilmActive(!addFilmActive);
    }

    const toggleAddShowtimePopup = (film) => {
        setFilm(film);
        getFilms();
        setAddShowtimeActive(!addShowtimeActive);
    }

    const toggleDeleteShowtimePopup = (gridId, filmName) => {
        setDeleteGridId(gridId);
        setDeleteShowtimeFilmName(filmName);
        getFilms();
        setDeleteShowtimeActive(!deleteShowtimeActive);
    }

    return (
        <>
            <PopupAddHall active={addHallActive} close={toggleAddHallPopup} />
            <PopupDeleteHall id={deleteHallActive} close={toggleDeleteHallPopup} />
            <PopupAddFilm active={addFilmActive} close={toggleAddFilmPopup} />
            <PopupAddShowtime film={film} halls={halls} active={addShowtimeActive} close={toggleAddShowtimePopup} />
            <PopupDeleteShowtime filmName={deleteShowtimeFilmName} gridId={deleteGridId} active={deleteShowtimeActive} close={toggleDeleteShowtimePopup} />
            <main className="conf-steps">
                <HallInfo
                    halls={halls}
                    popupHandler={toggleAddHallPopup}
                    popupDeleteHall={toggleDeleteHallPopup}
                />
                <HallConfig halls={halls} />
                <PriceConfig halls={halls} />
                <SessionsConfig
                    halls={halls}
                    popupAddFilmHandler={toggleAddFilmPopup}
                    popupAddShowtimeHandler={toggleAddShowtimePopup}
                    popupDeleteShowtimeHandler={toggleDeleteShowtimePopup}
                    films={films}
                    getFilms={getFilms}
                    grid={grid}
                />
                <OpenSales halls={halls} />
            </main>
        </>
    );
};

export default AdminPage;
