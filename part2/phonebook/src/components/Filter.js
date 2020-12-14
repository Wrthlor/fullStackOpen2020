import React from 'react';

const Filter = (prop) => {
    return (
        <div>
            Filter list of names: <input value={prop.value} onChange={prop.onChange} />
        </div>
    )
}

export default Filter; 