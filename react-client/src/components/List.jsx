import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Art and Quotes </h4>
    There are { props.items.length } images and quotes.
    { props.items.map(item => <ListItem item={item} key={item._id} id={item._id} increaseLike={props.addLike} decreaseLike={props.removeLike} />)}
  </div>
)

export default List;