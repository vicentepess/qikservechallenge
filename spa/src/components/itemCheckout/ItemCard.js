import React from 'react';
import "./style.css"

export const ItemCheckout = ({item, cart, index, setCart}) => {

  const removeItem = () => {
    setCart (cart.filter(elem => elem.data.id !== item.data.id))
  }
  
  return <div className='checkout-item-container'>
          <p>{cart[index].count} x {item.data.name} </p>
          <button onClick={removeItem}>remove from cart</button>
      </div>
};
