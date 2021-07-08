import React from "react";

const Select = ({ name, label, value, onChange, error, list }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div>
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="form-select form-control"
        >
          {list.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
          {/* <option selected>Open this select menu</option> */}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default Select;
