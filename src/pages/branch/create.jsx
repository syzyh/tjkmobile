import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TextareaItem, Toast, Button, List, InputItem } from 'antd-mobile';

import NavPage from '../../util/NavPage';
import NavBarP from '../../util/NavBarP';

import style from './branch.css';

import axios from 'axios';

import { createDiscussion } from './action.js';

class CreateDiscussion extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: [""],
      title: "",
      hasCreated: false,
    }
  }
  
  onTextAreaChange = (value, index) => {
    const tem = [...this.state.content];
    tem[index] = value;
    this.setState({content: tem});
  }
  
  deleteImage = index => {
    const tem = [...this.state.content];
    tem[index-1] = tem[index-1] + '\n' + tem[index+1];
    tem.splice(index, 2);
    this.setState({content: tem});
  }

  onInputImage = (file) => {
    const formData = new FormData();
    formData.append('media', file.target.files[0]);
    formData.append('type', 'picture');
    Toast.loading("正在上传图片", 0);
    axios({
      url: '/serve/api/media/upload',
      method: 'post',
      data: formData,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(res => {
      if (res.data.created) {
        this.setState({content: [...this.state.content, "!$[" + res.data._doc.url, ""]});
        Toast.hide();
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps);
    if (nextProps.updating && !this.state.hasCreated) {
      Toast.loading("正在发表", 0);
      this.setState({hasCreated: true});
    } 
    if (!nextProps.updating && this.state.hasCreated) {
      Toast.hide();
      this.props.history.goBack();
    }

    if (nextProps.error) {
      Toast.fail(nextProps.error, 1);
    }
  }
  
  render() {
    return (
      <NavPage>
        <NavBarP 
          title="发表话题"
          leftContent="返回"
          rightContent={[
            (<form key="0">
              <label>
                <i className={"iconfont icon-tupian"}></i>
                <input className={style["create-image-input"]} id="file" type="file" name="img" onChange={this.onInputImage}  />
              </label>
            </form>),
            <span key='3' style={{width: '0.2rem'}}></span>,
            <i key='1' className={"iconfont icon-fasong"} onClick={() => {
              const {title, content} = this.state;
              if(title.length === 0) {
                Toast.fail("标题不可以为空",1);
              } else if (content.length < 3 && content[0].length < 5) {
                Toast.fail("内容数量不可以少于五个字",1);
              } else {
                 this.props.createDiscussion({branch_name: this.props.match.url.split('/')[2], title, content})
              }
            }}></i>,
          ]}
          onLeftClick={()=>this.props.history.goBack()}
        >
        <div className={style["create-box"]} >
        <List renderHeader={null}>
          <InputItem
            clear
            placeholder="话题标题"
            autoFocus
            value={this.state.title}
            onChange={title => this.setState({title})}
          ></InputItem>
        </List>
          {this.state.content.map((c, index) => {
            if(c.startsWith('!$[')) {
              return (
                <div key={index}>
                  <div className={style["delete-img-btn-box"]} >
                    <Button type="ghost" icon="cross" className={style["delete-img-btn"]} onClick={() => this.deleteImage(index)}></Button>
                  </div>
                  <img alt="上传的图片" className={style["upload-img"]} key={index} src={c.split("!$[")[1]} />
                </div>
                );
            } else {
              return (<TextareaItem className={style["create-box-textarea"]} key={index} autoHeight value={c} onChange={e => this.onTextAreaChange(e, index)} placeholder={index === 0 ? '话题内容，至少五个字' : ''} />);
            }
          })}
          
        </div>
        </NavBarP>
      </NavPage>
    );
  }
}

export default connect(
  state => {
    return { ...state.branch };
  },
  dispatch => ({
    createDiscussion: (d) => { dispatch(createDiscussion(d)); },
  })
)(CreateDiscussion);