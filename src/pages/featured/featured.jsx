import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Facebook } from 'react-content-loader';

import NavBarP from '../../util/NavBarP';
import FeatureList from './featuredList';
import FeatureCarousel from './carousel';

import { fetchingData } from './action.js';

class Home extends Component {
  componentDidMount() {
    this.props.fetchingData();
  }
  

  render() {
    return (
        <NavBarP title="发现">
        {
          this.props.updating ? 
          <div>
            <Facebook />
          </div> :
          <div>
            <FeatureCarousel data={this.props.carousel} />
            <FeatureList data={this.props.featured} />
          </div>
        }
        </NavBarP>
    );
  }
}

export default connect(
  state => {
    return { ...state.featured };
  },
  dispatch => ({
    fetchingData: () => { dispatch(fetchingData()); },
  })
)(Home);