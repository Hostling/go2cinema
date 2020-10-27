import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ticket = (props) => {
    const params = props.location.state;
    const [qr, setQr] = useState(['data:image/png;base64, ']);

    useEffect(() => {
        axios.post('/api/cinema/qr', {
            name: params.name,
            seats: params.selected.toString(),
            hall: params.hall,
            time: params.time,
            price: params.price,
            sess: params.gridId,
        })
            .then(response => setQr(prevState => prevState + response.data))
            .then(() => {
                axios.post('/api/cinema/booking', {
                    gridId: params.gridId,
                    selected: params.selected.toString(),
                })
                    .then(response => console.log(response));
            })
    }, []);

    return (
        <main>
            <section className="ticket">

                <header className="tichet__check">
                    <h2 className="ticket__check-title">Электронный билет</h2>
                </header>

                <div className="ticket__info-wrapper">
                    <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{params.name}</span>
                    </p>
                    <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{params.selected.toString()}</span></p>
                    <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{params.hall}</span></p>
                    <p className="ticket__info">Начало сеанса: <span
                        className="ticket__details ticket__start">{params.time}</span></p>

                    <img className="ticket__info-qr" src={qr} />

                        <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения
                            бронирования.</p>
                        <p className="ticket__hint">Приятного просмотра!</p>
                </div>
            </section>
        </main>
    );
};

export default Ticket;
