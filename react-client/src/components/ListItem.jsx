import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   likes: this.props.item.likes
    // }
    
    // this.handleLike = this.handleLike.bind(this);
    // this.handleDislike = this.handleDislike.bind(this);
  };
  
  // handleLike () {
  //   this.setState( { likes: this.props.item.likes });
  // }
  
  // handleDislike () {
  //   this.setState( { likes: this.props.item.likes });
  // }
  
  render () {
    return (<div>
      <img src={ this.props.item.image } alt={ this.props.item.description } style={{ width: 300, height: 200}} />
      <p>{ this.props.item.quote } </p>
      <button onClick={() => {
        this.props.decreaseLike(this.props.id, this.props.item.likes);
        // this.handleLike(); 
      }}> unlike </button>
      <span> { this.props.item.likes } likes</span>
      <button onClick={() => {
        this.props.increaseLike(this.props.id, this.props.item.likes); 
        // this.handleDislike(); 
      }}> like </button>
    </div>)
  }
}

export default ListItem;