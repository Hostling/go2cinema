import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import Seat from "./Seat";

const HallConfig = ({halls}) => {
    const [activeHallConfig, setActiveHallConfig] = useState({
        id: 1,
        rows: 10,
        columns: 8,
        seats: [],
    })

    useEffect(() => {
        getSeatsConfig(activeHallConfig.id);
    }, []);

    const getSeatsConfig = (id) => {
        axios.get("/api/getSeatsConfig/" + id, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => {
                const rowsCount = activeHallConfig.rows;
                const columnsCount = activeHallConfig.columns;
                let temp = [];
                for(let i = 1; i <= rowsCount;i++) {
                    for(let k = 1; k <= columnsCount;k++) {
                        let id = (columnsCount * i) - (columnsCount - k);
                        let a = {
                            id: id,
                            row: i,
                            column: k,
                            type: response.data[id - 1].type,
                        };
                        if(temp[i] === undefined) temp[i] = [];
                        temp[i].push(a);
                    }
                }
                return temp;
            })
            .then(response => {
                setActiveHallConfig(prevState => {
                    return {
                        ...prevState,
                        seats: response
                    }})
            });
    }

    const handleSeatClick = (e) => {
        let newSeats = editSeats(activeHallConfig.seats, e.target.dataset);
        setActiveHallConfig(prevState => {
           return {
               ...prevState,
               seats: newSeats
           }
        });
    }

    const handleSaveSeats = () => {
        axios.post('/api/saveSeats', activeHallConfig,{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => console.log(response.data));
    }

    const editSeats = (prev, data) => {
        let newType = "";
        switch(data.type) {
            case("standart"):
                newType = "vip";
                break;
            case("vip"):
                newType = "disabled";
                break;
            default:
                newType = "standart";
        }
        prev[data.row][data.column - 1].type = newType;
        return prev;
    }

    const changeActive = (e) => {
        const id = e.target.dataset.id;
        setActiveHallConfig({
            id,
            rows: halls.find((elem, idx, halls) => elem.id === Number(id)).rows,
            columns: halls.find((elem, idx, halls) => elem.id === Number(id)).columns,
            seats: []
        })
        getSeatsConfig(id);
    }

    const rowsChangeHandler = (e) => {
        setActiveHallConfig(prevState => {
            return {
                ...prevState,
                rows: e.target.value,
            }
        });
    }

    const columnsChangeHandler = (e) => {
        setActiveHallConfig(prevState => {
            return {
                ...prevState,
                columns: e.target.value,
            }
        });
    }

    return (
        <section className="conf-step">
            <header className="conf-step__header conf-step__header_opened">
                <h2 className="conf-step__title">Конфигурация залов</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {halls.map(hall => (
                        <li key={nanoid()}>
                            <input
                                type="radio"
                                className="conf-step__radio"
                                name="chairs-hall"
                                data-id={hall.id}
                                onClick={changeActive}
                                defaultChecked={hall.id === activeHallConfig.id}
                            />
                            <span className="conf-step__selector">Зал {hall.id}</span>
                        </li>
                    ))}
                </ul>
                <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в
                    ряду:</p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Рядов, шт
                        <input
                            type="text"
                            className="conf-step__input"
                            placeholder={activeHallConfig.rows}
                            value={activeHallConfig.rows}
                            readOnly={true}
                        /></label>
                    <span className="multiplier">x</span>
                    <label className="conf-step__label">Мест, шт
                        <input
                            type="text"
                            className="conf-step__input"
                            placeholder={activeHallConfig.columns}
                            value={activeHallConfig.columns}
                            readOnly={true}
                        /></label>
                </div>
                <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                <div className="conf-step__legend">
                    <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                    <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                    <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет
                    кресла)
                    <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                </div>

                <div className="conf-step__hall">
                    <div className="conf-step__hall-wrapper">
                        {activeHallConfig.seats.map(row => (
                            <div className="conf-step__row" key={nanoid()}>
                                {row.map(elem => (
                                    <Seat
                                        key={elem.id}
                                        id={elem.id}
                                        type={elem.type}
                                        row={elem.row}
                                        column={elem.column}
                                        handleClick={handleSeatClick}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <fieldset className="conf-step__buttons text-center">
                    <button className="conf-step__button conf-step__button-regular">Отмена</button>
                    <input
                        type="submit"
                        value="Сохранить"
                        className="conf-step__button conf-step__button-accent"
                        onClick={handleSaveSeats}
                    />
                </fieldset>
            </div>
        </section>
    );
};

export default HallConfig;
