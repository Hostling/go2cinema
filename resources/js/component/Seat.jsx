import React from 'react';

const Seat = ({id, type, row, column, selected, handleClick}) => {
    if(selected.indexOf(id.toString()) !== -1) type = "selected";

    return (
        <span
            onClick={handleClick}
            data-id={id}
            data-row={row}
            data-column={column}
            className={'buying-scheme__chair buying-scheme__chair_' + type}
        />
    );
};

export default Seat;
