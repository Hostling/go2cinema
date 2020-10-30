import React from 'react';

const Seat = ({id, type, row, column, handleClick}) => {
    return (
        <span
            onClick={handleClick}
            data-id={id}
            data-row={row}
            data-column={column}
            data-type={type}
            className={'conf-step__chair conf-step__chair_' + type}
        />
    );
};

export default Seat;
