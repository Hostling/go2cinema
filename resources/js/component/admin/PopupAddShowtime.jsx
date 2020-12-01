import React, {useState} from 'react';

const PopupAddShowtime = ({active, close, halls, film}) => {
    const [selected, setSelected] = useState(1);
    const [time, setTime] = useState("08:00");

    const timeChangeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
    }

    const hallChangeHandler = (e) => {
        setSelected(e.target.value);
    }

    const addShowtimeHandler = (e) => {
        e.preventDefault();
        axios.post("/api/addShowtime", {
            "hall": selected,
            "time": time,
            "film": film.id
        }, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => response.status !== 200 ? console.log('Ошибка добавления сеанса') : close());
    }

    return (
        <div className={active ? "popup active": "popup"}>
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Добавление сеанса
                            <button className="popup__dismiss" href="#"><img
                                src="i/close.png"
                                alt="Закрыть"
                                onClick={e => {e.preventDefault();close()}}
                            /></button>
                        </h2>
                    </div>
                    <div className="popup__wrapper">
                        <form acceptCharset="utf-8">
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="hall">
                                Название зала
                                <select
                                    value={selected}
                                    onChange={hallChangeHandler}
                                    className="conf-step__input"
                                    name="hall">
                                    {halls.map(hall => (
                                        <option key={hall.id} value={hall.id} defaultChecked={selected === hall.id}>Зал {hall.id}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                                Время начала
                                <input
                                    className="conf-step__input"
                                    type="time"
                                    value={time}
                                    name="start_time"
                                    onChange={timeChangeHandler}
                                    required />
                            </label>

                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="film">
                                Название фильма
                                <input
                                    className="conf-step__input" type="text"
                                    name="film"
                                    value={film !== undefined ? film.name : ""}
                                    readOnly={true} />
                            </label>

                            <div className="conf-step__buttons text-center">
                                <input
                                    type="submit"
                                    value="Добавить"
                                    onClick={addShowtimeHandler}
                                       className="conf-step__button conf-step__button-accent" />
                                    <button
                                        className="conf-step__button conf-step__button-regular"
                                        onClick={e => {e.preventDefault();close()}}
                                    >Отменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupAddShowtime;
