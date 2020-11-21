import React, {useState} from 'react';

const OpenSales = () => {
    const [wrap, setWrap] = useState('opened');

    const wrapper = () => wrap === 'opened' ? setWrap('closed'):setWrap('opened');

    return (
        <section className="conf-step">
            <header
                onClick={wrapper}
                className={'conf-step__header  conf-step__header_' + wrap}>
                <h2 className="conf-step__title">Открыть продажи</h2>
            </header>
            <div className="conf-step__wrapper text-center">
                <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
            </div>
        </section>
    );
};

export default OpenSales;
