import React, { Component } from 'react';

import { Modal, TextareaItem } from 'antd-mobile';

//props: replyId, towardUser, createOpinion(opinion, replyId, towardUser), closeModal()
class CreateOpinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opinionModal: false,
      opinion: "",
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.creating !== null && prevProps.creating !== this.props.creating) {
      this.showModal();
    }
  }
  

  showModal = () => {
    this.setState(
      {opinionModal: true}, 
      ()=>this.textArea.focus()
    );
  }

  closeModal = () => this.setState({opinionModal: false, opinion: ''})

  render() {
    return (
      <div>
        <Modal
          visible={this.state.opinionModal}
          transparent
          maskClosable={false}
          onClose={this.closeModal}
          title="评论内容"
          style={{top: '-2rem'}}
          footer={
            [
              { 
              text: '取消', 
              onPress: this.closeModal
              }, 
              { text: '发表', 
                onPress: ()=>{
                  const opinion = this.textArea.state.value;
                  this.props.getOpinion(opinion);
                  this.closeModal();
                }
              }
            ]
          }
        >
          <TextareaItem
            ref={el => this.textArea = el}
            rows={3}
            placeholder="请输入评论内容"
          />
        </Modal>
      </div>
    );
  }
}

export default CreateOpinion;