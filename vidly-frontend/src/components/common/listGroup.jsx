import React, { Component } from "react";

class Genres extends Component {
  state = {};
  render() {
    let { list, currentGenre } = this.props;
    let classes = "list-group-item ";
    if (currentGenre === null) classes += "active";
    return (
      <ul className="list-group">
        <li className={classes} onClick={() => this.props.onlistchange(null)}>
          All Genres
        </li>
        {list.map((element) => {
          classes = "list-group-item ";
          if (element._id === currentGenre) classes += "active";
          return (
            <li
              className={classes}
              key={element._id}
              onClick={() => this.props.onlistchange(element._id)}
            >
              {element.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Genres;
