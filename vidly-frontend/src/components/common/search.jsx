import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          value={value}
          placeholder="Search..."
          onChange={(e) => onChange(e.currentTarget.value)}
          className="form-control"
        />
      </div>
    </form>
  );
};

export default SearchBox;
