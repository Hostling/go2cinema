import React from 'react';

const PopupDeleteShowtime = ({filmName, gridId, active, close}) => {

    const deleteShowtimeHandler = () => {
        axios.delete("/api/deleteShowtime/" + gridId, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => response.status !== 200 ? console.log('Ошибка удаления сеанса') : close());
    }

    return (
        <div className={active ? "popup active": "popup"}>
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Снятие с сеанса
                            <a className="popup__dismiss" href="#"
                            onClick={close}><img src="i/close.png" alt="Закрыть" /></a>
                        </h2>

                    </div>
                    <div className="popup__wrapper">
                        <form>
                            <p className="conf-step__paragraph">Вы действительно хотите снять с сеанса
                                фильм <span>{filmName}</span>?</p>
                            <div className="conf-step__buttons text-center">
                                <input type="submit" value="Удалить"
                                       className="conf-step__button conf-step__button-accent"
                                onClick={deleteShowtimeHandler}/>
                                    <button className="conf-step__button conf-step__button-regular" onClick={close}>Отменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupDeleteShowtime;
