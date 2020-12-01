import React, {useState} from 'react';

const Nav = () => {
    const [chosen, setChosen] = useState("2");
    const today = "31";

    const days = [
        {num: "31", day: "Пн"},
        {num: "1", day: "Вт"},
        {num: "2", day: "Ср"},
        {num: "3", day: "Чт"},
        {num: "4", day: "Пт"},
        {num: "5", day: "Сб"},
    ];


    const generateClassName = (num, day) => {
        let name = "page-nav__day";
        num === today ? name += " page-nav__day_today":false;
        num === chosen ? name += " page-nav__day_chosen":false;
        day === "Сб" || day === "Вс" ? name += " page-nav__day_weekend":false;
        return name;
    }

    return (
        <nav className="page-nav">
            {days.map(item => (
                <a className={generateClassName(item.num, item.day)}
                   href="#"
                   onClick={() => setChosen(item.num)}
                >
                    <span className="page-nav__day-week">{item.day}</span><span className="page-nav__day-number">{item.num}</span>
                </a>
            ))}
            <a className="page-nav__day page-nav__day_next" href="#">
            </a>
        </nav>
    );
};

export default Nav;
