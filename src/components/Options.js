import React from 'react';
import Option from './Option';

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions} >Remove All</button>
            {props.options.length === 0 && <p>Please add some options to get started!</p>}
            <ol>
                {
                    props.options.map((option, index) => (
                        <Option
                            handleDelete={props.handleDelete}
                            key={index}
                            optionText={option}
                        />
                    ))
                }
            </ol>
        </div>
    );
};

export default Options;