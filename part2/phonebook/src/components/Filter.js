import React from 'react';

const Filter = (props) => {
    return (
        <div>
            Filter list of names: <input value={props.value} onChange={props.onChange} />
        </div>
    )
};

export default Filter; 