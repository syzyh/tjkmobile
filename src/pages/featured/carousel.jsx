import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import styles from './featured.css';

class FeaturedCarousel extends Component {
  state = {
    data: ['', '', ''],
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <Carousel
          className={styles["my-carousel"]}
          autoplay
          infinite
          swipeSpeed={35}
          selectedIndex={1}
        >
          {this.props.data.map(c => (
            <a href={c.department_urlName} key={c._id}>
              <img
                src={c.department_imgUrl}
                alt="carousel"
              />   
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default FeaturedCarousel;
