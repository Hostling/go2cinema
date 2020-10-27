import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {nanoid} from "nanoid";
import Seat from './Seat';

const HallPage = (props) => {
    let seats = [];
    let tempHall = [];
    const [hall, setHall] = useState([]);
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);
    const params = props.location.state;

    useEffect(() => {
        async function load() {
            await getInfo();
            await makeRows();
            await setRows(tempHall);
        }
        load();
    }, []);

    const getInfo = () => {
        axios.get( '/api/cinema/sessioninfo/' + params.gridId)
            .then(response => seats = response.data);
    }

    const handleClick = (e) => {
        if(selected.indexOf(e.target.dataset.id.toString()) !== -1) return null;
        switch(e.target.className) {
            case("buying-scheme__chair buying-scheme__chair_standart"):
                setTotal(prevState => prevState + hall.price);
                break;
            case("buying-scheme__chair buying-scheme__chair_vip"):
                setTotal(prevState => prevState + hall.priceVip);
                break;
            default:
                return;
        }
        let id = e.target.dataset.id;
        setSelected(prevState => ([...prevState, id]));
        e.target.className = "buying-scheme__chair buying-scheme__chair_selected";
    }

    const makeRows = () => {
        axios.get('/api/cinema/getHallInfo/' + params.hall)
            .then(response => response.data[0])
            .then(resp => {
                setHall(resp);
                const rowsCount = resp.rows;
                const columnsCount = resp.columns;
                let temp = [];
                for(let i = 1; i <= rowsCount;i++) {
                    for(let k = 1; k <= columnsCount;k++) {
                        let id = (columnsCount * i) - (columnsCount - k);
                        let a = {
                            id: id,
                            row: i,
                            column: k,
                            type: seats[id - 1].type,
                        };
                        if(temp[i] === undefined) temp[i] = [];
                        temp[i].push(a);
                    }
                }
                return temp;
            })
            .then(temp => setRows(temp));

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
                                    <Seat
                                        key={elem.id}
                                        id={elem.id}
                                        type={elem.type}
                                        row={elem.row}
                                        column={elem.column}
                                        selected={selected}
                                        handleClick={handleClick}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="buying-scheme__legend">
                        <div className="col">
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span
                                className="buying-scheme__legend-value">{hall.price}</span>руб)</p>
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span
                                className="buying-scheme__legend-value">{hall.priceVip}</span>руб)</p>
                        </div>
                        <div className="col">
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                            <p className="buying-scheme__legend-price"><span
                                className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                        </div>
                    </div>
                </div>
                <button className="acceptin-button"><Link to={total === 0 ? null : {
                    pathname: "/payment",
                    state: {
                        name: params.name,
                        hall: params.hall,
                        time: params.time,
                        gridId: params.gridId,
                        price: total,
                        selected,
                    }
                }}>Забронировать</Link></button>
            </section>
        </main>
    );
};

export default HallPage;
