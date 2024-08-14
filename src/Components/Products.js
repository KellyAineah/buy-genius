import React, { useState, useEffect, useContext } from 'react';
import { fetchAllProducts, fetchAllCategories, recordSearchHistory, addToWishlist, fetchWishlist } from './api.js'; 
import { AuthContext } from './AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { fetchAllProducts, fetchAllCategories, recordSearchHistory } from './api';  // Removed sendMessage import
import './Products.css';
import ProductModal from './ProductModal';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatCard from './ChatCard';
import { AuthContext } from './AuthContext';

const Products = ({ theme }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeChat, setActiveChat] = useState(null);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    fetchAllProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setFilteredProducts([]);
      });

    fetchAllCategories()
      .then(data => setCategories(data))
      .catch(error => console.error('Failed to fetch categories:', error));

    if (isAuthenticated) {
      fetchWishlist()
        .then(items => {
          setWishlistItems(items);
        })
        .catch(error => {
          console.error('Failed to fetch wishlist', error);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      recordSearchHistory(searchTerm)
        .then(response => console.log('Search history recorded:', response))
        .catch(error => console.error('Failed to record search history:', error));
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category_id === parseInt(selectedCategory)
      );
    }

    filtered = filtered.map(product => {
      const marginalBenefit = calculateMB(product);
      const costBenefit = calculateCB(product);
      return { ...product, marginalBenefit, costBenefit };
    });

    filtered.sort((a, b) => 
      a.costBenefit - b.costBenefit || b.marginalBenefit - a.marginalBenefit
    );

    if ((searchTerm || selectedCategory) && filtered.length > 0) {
      filtered[0] = { ...filtered[0], recommended: true };
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const calculateMB = (product) => {
    return product.price;
  };

  const calculateCB = (product) => {
    return product.price + product.delivery_cost;
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToWishlist = (productId) => {
    if (isAuthenticated) {
      const isAlreadyInWishlist = wishlistItems.some(item => item.product.id === productId);

      if (isAlreadyInWishlist) {
        toast.info('Already added to wishlist!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        addToWishlist(productId)
          .then(response => {
            toast.success('Item added to wishlist!', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setWishlistItems([...wishlistItems, { product: { id: productId } }]); 
          })
          .catch(error => {
            toast.error('Failed to add item to wishlist.', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            console.error('Failed to add to wishlist:', error);
          });
      }
    } else {
      alert('You need to log in to add items to your wishlist.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleChatWithRetailer = (retailerName, retailerId, productId) => {
    setActiveChat({ retailerName, retailerId, productId });
  };

  return (
    <div className={`products-container ${theme}`}>
      <div className="header-product">
        <h2>Explore Products</h2>
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>
      <div className="filters-container">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image_url} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Price: Ksh.{product.price}</p>
              <p>Retailer: {product.retailer_name || 'Unknown'}</p> 
              <button 
                className="wishlist-button" 
                onClick={() => handleAddToWishlist(product.id)}
              >
                ❤️
                <span className="wishlist-tooltip">Add to my wishlist</span>
              </button>
              <p>Retailer: {product.retailer_name || 'Unknown'}</p>
              {product.recommended && <button className="recommended-btn">Recommended</button>}
              <button className="more-details-btn" onClick={() => handleCardClick(product)}>See More Details</button>
              <button 
                className="chat-retailer-btn" 
                onClick={() => handleChatWithRetailer(product.retailer_name || 'Unknown', product.retailer_id, product.id)}
              >
                Chat with Retailer
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
      <ToastContainer />
      {activeChat && (
        <ChatCard 
        retailerName={activeChat.retailerName} // Passing retailer name
        retailerId={activeChat.retailerId} 
        userId={userId}
        onClose={() => setActiveChat(null)} // Close chat when done
      />
      )}
    </div>
  );
};

export default Products;
