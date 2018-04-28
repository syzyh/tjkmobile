import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment';

import style from './forum.css';

const Images = (props) => {
  if (props.images.length === 0) {
    return null;
  } else if (props.images.length === 1) {
    return (
      <div className={style["forum-content-imageGroup"]}>
        <img className={style["forum-content-singleImg"]} alt="文章图片" src={props.images[0]} />
      </div>
    )
  } else if (props.images.length === 2) {
    return (
      <div className={style["forum-content-imageGroup"]}>
        <img className={style["forum-content-doubleImg"]} alt="文章图片" src={props.images[0]}/>
        <img className={style["forum-content-doubleImg"]} alt="文章图片" src={props.images[1]}/>
      </div>
    )
  } else {
    return (
      <div className={style["forum-content-imageGroup"]}>
        <img className={style["forum-content-multiImg"]} alt="文章图片" src={props.images[0]}/>
        <img className={style["forum-content-multiImg"]} alt="文章图片" src={props.images[1]}/>
        <img className={style["forum-content-multiImg"]} alt="文章图片" src={props.images[2]}/>
      </div>
    )
  }
};

const Contents = (props) => {
  let imgArray = [], words = "";
  props.content.forEach(c => {
    if(c.startsWith("!$[")) {
      imgArray.push(c.split("!$[")[1]);
    } else {
      words += (words ? '\n\r' + c : c);
    }
  });
    
  return (
    <div className={style['forum-content']}>
      <div className={style['forum-content-word']}>
        <div className={style['forum-content-words']}>
          {words}
        </div>
      </div>
      <Images images={imgArray} />
    </div>
  )
};

class Forum extends Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    const hei = document.documentElement.clientHeight;
    const remHei = hei / Number.parseInt(getComputedStyle(document.documentElement)['font-size'].split('px')[0], 10);
    const height = (remHei - this.props.slicedHeight) + 'rem'
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.discussions),
      height,
    });
  } 

  componentWillReceiveProps(nextProps) {
    console.log("nextProps in forum:", nextProps);
    if (nextProps.discussions !== this.props.discussions) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.discussions),
      });
    }
  }

  render() {
    console.log("render in forum:",this.props);
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: '0.16rem',
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      const d = rowData;
      console.log("Forum List:", d, sectionID, rowID);
      return (
        <div key={d._id} className={style['forum-item']} >
          <Link to={`/discussion/${d._id}`} onClick={() => {this.props.setDiscussion(d)}}>
            <div className={style['forum-title']}>{d.title}</div>
            <Contents content={d.content} />
            <div className={style['forum-footer-word']}>
              <span className={style['forum-footer-description']}>{d.user.userName + ' · ' + moment(d.modified_date).fromNow()}</span>
              <div className={style['forum-footer-number']}><i className={"iconfont icon-xiaoxi1"}></i>{' ' + d.opinions.length}</div>
            </div>
          </Link>
        </div>
      );
    };

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          initialListSize={6}
          dataSource={this.state.dataSource}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default Forum;