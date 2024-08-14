import React, { useState, useEffect, useContext } from 'react';
import { fetchWishlist, removeFromWishlist } from './api';
import { AuthContext } from './AuthContext';
import './Wishlist.css';

const Wishlist = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist()
        .then(items => {
          setWishlistItems(items);
        })
        .catch(error => console.error('Failed to fetch wishlist', error));
    }
  }, [isAuthenticated]);

  const handleRemoveFromWishlist = (wishlistId) => {
    removeFromWishlist(wishlistId)
      .then(() => {
        setWishlistItems(wishlistItems.filter(item => item.id !== wishlistId));
      })
      .catch(error => console.error('Failed to remove item from wishlist', error));
  };

  if (!isAuthenticated) {
    return <p>You need to be logged in to view your wishlist.</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <div className="wishlist-items">
          {wishlistItems.map(item => {
            const product = item.product; 
            return product ? (
              <div key={item.id} className="wishlist-item">
                <img src={product.image_url} alt={product.name} className="wishlist-item-image" />
                <div>
                  <h3>{product.name}</h3>
                  <p>Price: Ksh.{product.price}</p>
                  <button 
                    className="remove-button" 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div key={item.id} className="wishlist-item">
                <p>No Product Details Available</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Your wishlist is empty. Start adding your favorite products!</p>
      )}
    </div>
  );
};

export default Wishlist;
