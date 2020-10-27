import React from 'react';
import {Link} from "react-router-dom";

const Payment = (props) => {
    const params = props.location.state;
    return (
        <main>
            <section className="ticket">

                <header className="tichet__check">
                    <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
                </header>

                <div className="ticket__info-wrapper">
                    <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{params.name}</span>
                    </p>
                    <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{params.selected.toString()}</span></p>
                    <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{params.hall}</span></p>
                    <p className="ticket__info">Начало сеанса: <span
                        className="ticket__details ticket__start">{params.time}</span></p>
                    <p className="ticket__info">Стоимость: <span
                        className="ticket__details ticket__cost">{params.price}</span> рублей</p>

                    <button className="acceptin-button">
                        <Link to={{
                            pathname: "/ticket",
                            state: params,
                        }}>Получить код бронирования</Link>
                    </button>

                    <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на
                        почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                    <p className="ticket__hint">Приятного просмотра!</p>
                </div>
            </section>
        </main>
    );
};

export default Payment;
