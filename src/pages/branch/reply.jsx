import React, { Component } from 'react';
import style from './branch.css';

class Reply extends Component {
  state = {
    limit: 5,
  }
  render() {
    if (!this.props.data || this.props.data.length === 0) return null;
    return (
      <div className={style['reply']}>
        <div className={style['opinion-line']}></div>
        {
          this.props.data.map((r, index)=> {
            console.log(index, this.state.limit)
            if (index < this.state.limit) {
              return (
                <div key={r._id} className={style['reply-item']} onClick={this.props.reply(this.props.opinionId, {name: r.user.userName, id: r.user._id})}>
                  <span className={style['username']}>{r.user.userName}</span>
                  {
                    r.toward_user ?
                    <span>
                      <span className={style['opinion-content-words']}>回复</span>
                      <span className={style['toward-username']}>{r.toward_user.name}</span>
                    </span> :
                    null
                  }
                  <span className={style['opinion-content-words']}>: {r.content}</span>
                </div>
              )
            } else {
              if (index === this.state.limit)
                return <div>查看更多</div>
            }
          )}
        }
      </div>
    );
  }
}

export default Reply;