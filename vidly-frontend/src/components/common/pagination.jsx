import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};
  render() {
    let noofpages = this.props.itemCount / this.props.PageSize;
    noofpages = Math.ceil(noofpages);

    if (noofpages === 1) return null;
    const pages = _.range(1, noofpages + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((number) => {
            let classes = "page-item ";
            if (number === this.props.currentPage) classes += "active";
            return (
              <li className={classes} key={number}>
                <a
                  className="page-link active"
                  onClick={() => this.props.OnPageChange(number)}
                >
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  PageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
