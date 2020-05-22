import React from 'react';

const InputField = ({ labelName, type, name, placeholder, value, handleChange }) => (
    <label>
        { labelName ? (`${labelName}: `) : "" }
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    </label>
);

export default InputField;