import React, {useState, useEffect } from 'react';
import HallInfo from "./HallInfo";
import HallConfig from "./HallConfig";
import PriceConfig from "./PriceConfig";
import SessionsConfig from "./SessionsConfig";
import OpenSales from "./OpenSales";
import PopupAddHall from "./PopupAddHall";
import PopupDeleteHall from "./PopupDeleteHall";

const AdminPage = () => {
    const [halls, setHalls] = useState([]);
    const [addHallActive, setAddHallActive] = useState(false);
    const [deleteHallActive, setDeleteHallActive] = useState(false);

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

    return (
        <>
            <PopupAddHall active={addHallActive} close={toggleAddHallPopup} />
            <PopupDeleteHall id={deleteHallActive} close={toggleDeleteHallPopup} />
            <main className="conf-steps">
                <HallInfo
                    halls={halls}
                    popupHandler={toggleAddHallPopup}
                    popupDeleteHall={toggleDeleteHallPopup}
                />
                <HallConfig />
                <PriceConfig />
                <SessionsConfig />
                <OpenSales />
            </main>
        </>
    );
};

export default AdminPage;
