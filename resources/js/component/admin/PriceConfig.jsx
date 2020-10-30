import React, {useState, useEffect} from 'react';

const PriceConfig = ({halls}) => {
    const [activeHall, setActiveHall] = useState({
        id: 1,
    })
    const [price, setPrice] = useState(200);
    const [priceVip, setPriceVip] = useState(350);

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleChangePriceVip = (e) => {
        setPriceVip(e.target.value);
    }

    const savePriceHandler = () => {
        axios.post("/api/setPrice", {
            id: activeHall.id,
            price,
            priceVip,
        }, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }})
            .then(response => console.log(response.data));
    }

    const changeActiveHandler = (e) => {
        setActiveHall({id: e.target.dataset.id});
        setPrice(halls.find((elem, idx, halls) => elem.id === Number(e.target.dataset.id)).price);
        setPriceVip(halls.find((elem, idx, halls) => elem.id === Number(e.target.dataset.id)).priceVip);
    }

    return (
        <section className="conf-step">
            <header className="conf-step__header conf-step__header_opened">
                <h2 className="conf-step__title">Конфигурация цен</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {halls.map(hall => (
                        <li key={hall.id}><input
                            type="radio"
                            className="conf-step__radio"
                            name="prices-hall"
                            onClick={changeActiveHandler}
                            data-id={hall.id}
                            defaultValue={"Зал " + hall.id}
                            defaultChecked={hall.id === activeHall.id}
                        /><span className="conf-step__selector">Зал {hall.id}</span></li>
                    ))}
                </ul>

                <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Цена, рублей
                        <input
                            type="text"
                            className="conf-step__input"
                            placeholder="0"
                            onChange={handleChangePrice}
                            value={price}
                        /></label>
                    за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Цена, рублей
                        <input
                            type="text"
                            className="conf-step__input"
                            placeholder="0"
                            onChange={handleChangePriceVip}
                            value={priceVip}
                        /></label>
                    за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
                </div>

                <fieldset className="conf-step__buttons text-center">
                    <button className="conf-step__button conf-step__button-regular">Отмена</button>
                    <input
                        type="submit"
                        value="Сохранить"
                        className="conf-step__button conf-step__button-accent"
                        onClick={savePriceHandler}
                    />
                </fieldset>
            </div>
        </section>
    );
};

export default PriceConfig;
