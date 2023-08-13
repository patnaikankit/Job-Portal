// form.jsx
import React from "react";

export default function Form({ htmlFor, labelText, type, value, handleChange, name }) {
  return (
    <div className="mb-1">
      <label htmlFor={htmlFor} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        id={htmlFor}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
}
