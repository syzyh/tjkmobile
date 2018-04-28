import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './featured.css';

class RowScroll extends Component {
  render() {
    return (
      <div className={styles["type-all"]}>
        {this.props.firstRow ? null : <div className={styles["cut-line"]}></div>}
        <p className={styles["type-title"]}>{this.props.data.category_name}</p>
        <div className={styles["type-row-scrollbar"]}>
        <div className={styles["type-row"]}>
        {
          this.props.data.departments ?
          <ul className={styles["type-content"]} style={{ width: `${(1.8 * this.props.data.departments.length) + 0.2}rem` }}>
            {
              this.props.data.departments.map((data, index) => (
                <li key={data._id} className={styles["type-block"]} >
                  <Link to={'/branch/' + data.department_urlName} >
                    <img src={data.department_imgUrl} alt="test" />
                    <p>{data.department_name}</p>
                  </Link>
                </li>
              ))
            }
          </ul> :
          null
        }
        </div>
        </div>
      </div>
    );
  }
}

export default RowScroll;