import React, { useState } from 'react';
import '../styles/ProductCard.css';
import Swal from 'sweetalert2';

function ProductCard({ product, onAddToCart }) {
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    setCartQuantity(!isNaN(quantity) ? quantity : 0);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.sale_price}</p>
      <input
        className="product-quantity-input"
        type="number"
        min="0"
        max={product.stock}
        value={cartQuantity}
        onChange={handleQuantityChange}
      />
      <button
        className="add-to-cart-button"
        onClick={() => {
          if (cartQuantity > 0 && cartQuantity <= product.stock) {
            onAddToCart(product, cartQuantity);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `La cantidad debe ser mayor que 0 y no exceder el stock disponible (${product.stock}).`,
              confirmButtonColor: '#FF0000',
            });
          }
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
