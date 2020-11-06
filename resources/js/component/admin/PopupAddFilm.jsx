import React, {useState} from 'react';

const PopupAddFilm = ({active, close}) => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");

    const changeNameHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const changeCountryHandler = (e) => {
        e.preventDefault();
        setCountry(e.target.value);
    }

    const changeDurationHandler = (e) => {
        e.preventDefault();
        setDuration(e.target.value);
    }

    const changeDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    const addFilmHandler = (e) => {
        e.preventDefault();
        axios.post("/api/addFilm", {
            name,
            description,
            country,
            duration
            },
        {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => response.status !== 200 ? console.log('Ошибка добавления зала') : close());
    }

    return (
        <div className={active ? "popup active": "popup"}>
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Добавление фильма
                            <a className="popup__dismiss" href="#"><img
                                src="i/close.png"
                                alt="Закрыть"
                                onClick={close}
                            /></a>
                        </h2>

                    </div>
                    <div className="popup__wrapper">
                        <form acceptCharset="utf-8">
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                                Название фильма
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Например, &laquo;Гражданин Кейн&raquo;"
                                    name="name"
                                    onChange={changeNameHandler}
                                    value={name}
                                    required />
                            </label>
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
                                Описание
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Например, &laquo;какое-то описание&raquo;"
                                    name="description"
                                    onChange={changeDescription}
                                    value={description}
                                    required />
                            </label>
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="country">
                                Страна
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Например, &laquo;Россия&raquo;"
                                    name="country"
                                    onChange={changeCountryHandler}
                                    value={country}
                                    required />
                            </label>
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration">
                                Длительность в минутах
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Например, &laquo;90&raquo;"
                                    name="duration"
                                    onChange={changeDurationHandler}
                                    value={duration}
                                    required />
                            </label>
                            <div className="conf-step__buttons text-center">
                                <input
                                    type="submit"
                                    value="Добавить фильм"
                                    onClick={addFilmHandler}
                                    className="conf-step__button conf-step__button-accent" />
                                    <button
                                        className="conf-step__button conf-step__button-regular"
                                        onClick={close}
                                    >Отменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupAddFilm;
