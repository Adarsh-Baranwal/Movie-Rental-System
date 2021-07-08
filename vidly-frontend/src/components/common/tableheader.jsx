import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort(path) {
    let setColoumn = { ...this.props.setColoumn };
    if (path === setColoumn.path)
      setColoumn.order = setColoumn.order === "asc" ? "desc" : "asc";
    else {
      setColoumn.path = path;
      setColoumn.order = "asc";
    }
    this.props.Onsort(setColoumn);
  }
  rendersorticon = (coloumn) => {
    let { setColoumn } = { ...this.props };
    if (coloumn.path !== setColoumn.path) return null;
    if (setColoumn.order === "asc")
      return <i className="fa fa-sort-asc m-1"></i>;
    return <i className="fa fa-sort-desc m-1"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.coloumns.map((coloumn) => {
            return (
              <th
                key={coloumn.path || coloumn.key}
                onClick={() => this.raiseSort(coloumn.path)}
              >
                {coloumn.label}
                {this.rendersorticon(coloumn)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
