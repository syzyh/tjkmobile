import React, { Component } from 'react';

import RowScroll from './rowScroll';
class FeaturedList extends Component {
  render() {
    return (
      <div>
        {this.props.data.map((c, index) => (
          <RowScroll firstRow={index===0} key={c._id} data={c} />
        ))}
      </div>
    );
  }
}

export default FeaturedList;