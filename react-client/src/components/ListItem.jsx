import React from 'react';

const ListItem = (props) => (
  <div key={props.item.description}>
    <img src={ props.item.image } alt={ props.item.description } style={{ width: 200, height: 200}} />
  </div>
)

export default ListItem;