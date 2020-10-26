import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {nanoid} from "nanoid";

const HallPage = (props) => {
    let seats = [];
    let hall = [];

    const [rows, setRows] = useState([]);
    const params = props.location.state;

    useEffect(() => getInfo(), []);

    const getInfo = () => {
        axios.get( '/api/cinema/sessioninfo/' + params.gridId)
            .then(response => seats = response.data)
            .then(() => {
                axios.get('/api/cinema/getHallInfo/' + params.hall)
                    .then(resp => hall = resp.data)
                    .then(() => setRows(makeRows()));
            });
    }

    const makeRows = () => {
        const rowsCount = hall[0].rows;
        const columnsCount = hall[0].columns;
        let temp = [];
        for(let i = 1; i <= rowsCount;i++) {
            for(let k = 1; k <= columnsCount;k++) {
                let id = (columnsCount * i) - (columnsCount - k);
                let a = {
                    id: id,
                    column: k,
                    type: seats[id - 1].type,
                };
                if(temp[i] === undefined) temp[i] = [];
                temp[i].push(a);
            }
        }
        return temp;
    }

    return (
        <main>
            <section className="buying">
                <div className="buying__info">
                    <div className="buying__info-description">
                        <h2 className="buying__info-title">{params.name}</h2>
                        <p className="buying__info-start">Начало сеанса: {params.time}</p>
                        <p className="buying__info-hall">Зал {params.hall}</p>
                    </div>
                    <div className="buying__info-hint">
                        <p>Тапните дважды,<br />чтобы увеличить</p>
                    </div>
                </div>
                <div className="buying-scheme">
                    <div className="buying-scheme__wrapper">
                        {rows.map(item => (
                            <div className="buying-scheme__row" key={nanoid()}>
                                {item.map(elem => (
                                    <span className={'buying-scheme__chair buying-scheme__chair_' + elem.type} key={elem.id}></span>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="buying-scheme__legend">
                        <div className="col">
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span
                                className="buying-scheme__legend-value">250</span>руб)</p>
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span
                                className="buying-scheme__legend-value">350</span>руб)</p>
                        </div>
                        <div className="col">
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                        </div>
                    </div>
                </div>
                <button className="acceptin-button"><Link to="/payment">Забронировать</Link></button>
            </section>
        </main>
    );
};

export default HallPage;
