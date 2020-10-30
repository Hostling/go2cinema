import React, {useState} from 'react';

const PopupAddHall = ({active, close}) => {
    const [number, setNumber] = useState('');

    const addHallRequest = (e) => {
        axios.post("/api/createHall", {
            id: number,
            rows: 10,
            columns: 10,
            price: 200,
            priceVip: 250,
        }, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => response.status !== 200 ? console.log('Ошибка создания зала') : close());
    }

    const changeHandler = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
    }

    return (
        <div className={active ? "popup active": "popup"}>
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Добавление зала
                            <a className="popup__dismiss" href="#" onClick={close}><img src="i/close.png" alt="Закрыть"/></a>
                        </h2>
                    </div>
                    <div className="popup__wrapper">
                        <form acceptCharset="utf-8">
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                                Номер зала
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Например, &laquo;Зал 1&raquo;"
                                    name="name"
                                    onChange={changeHandler}
                                    value={number}
                                    required/>
                            </label>
                            <div className="conf-step__buttons text-center">
                                <input
                                    type="submit"
                                    value="Добавить зал"
                                    className="conf-step__button conf-step__button-accent"
                                    onClick={addHallRequest}
                                />
                                <button onClick={close} className="conf-step__button conf-step__button-regular">Отменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupAddHall;
