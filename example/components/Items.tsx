import React = require('react');
import { Posts } from '../hooks/useAPI';

const Items = ({ items }: { items: Posts }) => {
  return (
    <>
      {items.map(item => (
        <div key={item.id} className="itemsContainer">
          <h4>{item.title}</h4>
          <span>{item.body}</span>
        </div>
      ))}
    </>
  );
};

export default Items;
