import React, { Component } from 'react';
import { List } from 'antd-mobile';
import {Link} from 'react-router-dom';
import style from '../message/message.css';

const Item = List.Item;
const Brief = Item.Brief;

//props: audios, type
class Audios extends Component {
  render() {
    return (
      <List className={style['audios-listBody']}>
        {
          this.props.audios.filter(a => a.type === this.props.type).map((a, index) => (
            <Link key={a._id} to={`/audio/${a._id}`} >
              <Item  align="top" thumb={a.audio_imgUrl} multipleLine className={style['audios-listItem']} >
                {a.audio_name} <Brief>{a.audio_description}</Brief>
              </Item>
             </Link>
          ))
        } 
      </List>
      
    );
  }
}

export default Audios;