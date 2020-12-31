import React from 'react';

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                Name: <input value={props.nameValue} onChange={props.nameChange} />
            </div>
            <div>
                Number: <input value={props.numberValue} onChange={props.numberChange} />
            </div>
            <div>
                <button type="submit" >Add</button>
            </div>
        </form>
    )
};

export default Form; 