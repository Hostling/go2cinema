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

    useEffect(() => {
        getHalls();
    }, []);

    const getHalls = () => {
        axios.get('/api/getHalls', {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => setHalls(response.data))
    }

    const toggleAddHallPopup = () => {
        setAddHallActive(!addHallActive);
    }

    const toggleDeleteHallPopup = (id) => {
        setDeleteHallActive(deleteHallActive ? false : id);
    }

    const toggleAddFilmPopup = () => {
        setAddFilmActive(!addFilmActive);
    }

    const toggleAddShowtimePopup = (film) => {
        setFilm(film);
        setAddShowtimeActive(!addShowtimeActive);
    }

    const toggleDeleteShowtimePopup = (gridId, filmName) => {
        setDeleteGridId(gridId);
        setDeleteShowtimeFilmName(filmName);
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
                />
                <OpenSales />
            </main>
        </>
    );
};

export default AdminPage;
