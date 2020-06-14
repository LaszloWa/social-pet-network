import React from 'react';

const InputField = ({ labelName, id, type, min, name, placeholder, value, handleChange, ...otherProps }) => (
    <div>
        <label htmlFor={id}>
            { labelName ? (`${labelName}: `) : "" }
        </label>
        <input
            type={type}
            min={ min ? min : ""}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            {...otherProps}
        />
    </div>    
);

export default InputField;