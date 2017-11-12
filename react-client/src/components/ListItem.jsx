import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.item.likes
    }
  };
  
  handleLike () {
    // set state
  }
  
  handleDisLike () {
    // set state
  }
  
  render () {
    return (<div>
      <img src={ this.props.item.image } alt={ this.props.item.description } style={{ width: 300, height: 200}} />
      <p>{ this.props.item.quote } </p>
      <button onClick={() => this.props.increaseLike(this.props.id)}>Like</button>
      <span> { this.props.item.likes } </span>
      <button onClick={() => this.decreaseLike(this.props.id)}>Unlike</button>
    </div>)
  }
}

export default ListItem;