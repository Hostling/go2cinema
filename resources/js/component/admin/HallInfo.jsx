import React,{useState} from 'react';

const HallInfo = ({halls, popupHandler, popupDeleteHall}) => {
    const [wrap, setWrap] = useState('opened');

    const wrapper = () => wrap === 'opened' ? setWrap('closed'):setWrap('opened');

    return (
        <section className="conf-step">
            <header
                onClick={wrapper}
                className={'conf-step__header  conf-step__header_' + wrap}>
                <h2 className="conf-step__title">Управление залами</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Доступные залы:</p>
                <ul className="conf-step__list">
                    {halls.map(hall => (
                        <li key={hall.id}>Зал {hall.id}
                            <button
                                onClick={popupDeleteHall.bind(this, hall.id)}
                                className="conf-step__button conf-step__button-trash"
                            ></button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={popupHandler}
                    className="conf-step__button conf-step__button-accent">Создать зал</button>
            </div>

        </section>
    );
};

export default HallInfo;
