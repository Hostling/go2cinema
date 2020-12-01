import React, {useState} from 'react';

const OpenSales = ({halls}) => {
    const [activeHall, setActiveHall] = useState({
        id: 0,
    });
    const [wrap, setWrap] = useState('opened');

    const [status, setStatus] = useState('Приостановить продажу билетов');

    const changeActiveHandler = (e) => {
        setActiveHall({id: e.target.dataset.id});
        getStatus();
    }

    const getStatus = () => {
        if(halls[Number(activeHall.id)].active === 0) {
            setStatus('Открыть продажу билетов');
        } else {
            setStatus('Приостановить продажу билетов');
        }
    }

    const changeStatus = () => {
        if(status === 'Приостановить продажу билетов') {
            setStatus('Открыть продажу билетов');
        } else {
            setStatus('Приостановить продажу билетов');
        }
    }

    const wrapper = () => wrap === 'opened' ? setWrap('closed'):setWrap('opened');

    const toggleHall = () => {
        axios.get('/api/toggleHall/' + halls[Number(activeHall.id)].id, {headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
            .then(response => console.log(response.data))
            .then(() => changeStatus())
    }

    return (
        <section className="conf-step">
            <header
                onClick={wrapper}
                className={'conf-step__header  conf-step__header_' + wrap}>
                <h2 className="conf-step__title">Открыть продажи</h2>
            </header>
            <div className="conf-step__wrapper text-center">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {halls.map((hall, idx) => (
                        <li key={idx}><input
                            type="radio"
                            className="conf-step__radio"
                            name="prices-hall"
                            onClick={changeActiveHandler}
                            data-id={idx}
                            defaultValue={"Зал " + hall.id}
                            defaultChecked={hall.id === activeHall.id}
                        /><span className="conf-step__selector">Зал {hall.id}</span></li>
                    ))}
                </ul>
                <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                <button className="conf-step__button conf-step__button-accent" onClick={toggleHall}>
                    {status}
                </button>

            </div>
        </section>
    );
};

export default OpenSales;
