import React from 'react';

const PopupDeleteHall = ({id, close}) => {
    const deleteHallRequest = (e) => {
        axios.delete("/api/deleteHall/" + id, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => response.status !== 200 ? console.log('Ошибка удаления зала') : close.bind(this, false));
    }

    return (
        <div className={id ? "popup active": "popup"}>
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Удаление зала
                            <a
                                className="popup__dismiss"
                                href="#"
                                onClick={close.bind(this, false)}
                            ><img src="i/close.png" alt="Закрыть" /></a>
                        </h2>

                    </div>
                    <div className="popup__wrapper">
                        <form acceptCharset="utf-8">
                            <p className="conf-step__paragraph">Вы действительно хотите удалить зал <span>{id}</span>?</p>
                            <div className="conf-step__buttons text-center">
                                <input
                                    type="submit"
                                    value="Удалить"
                                    className="conf-step__button conf-step__button-accent"
                                    onClick={deleteHallRequest}
                                />
                                    <button
                                        onClick={close.bind(this, false)}
                                        className="conf-step__button conf-step__button-regular">Отменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupDeleteHall;
