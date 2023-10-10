import React from 'react';

function ProductPopup({ product, quantity, increment, decrement, closePopup }) {
  return (
    <div className="product-popup">
      <div className="product-popup-content">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div className="product-quantity">
          <button onClick={decrement}>-</button>
          <span>{quantity}</span>
          <button onClick={increment}>+</button>
        </div>
        <button className="add-to-cart-button" onClick={closePopup}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ProductPopup;
