const BASE_URL = process.env.REACT_APP_API_URL;


// Function to handle responses
const handleResponse = (response) => {
  if (response.ok) {
    return response.json().catch(() => ({})); 
  } else {
    return response.json().then((error) => {
      throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
    }).catch(() => {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    });
  }
};

// Function to handle errors
const handleError = (error) => {
  console.error('API call failed:', error.message);
  throw error; 
};

export const signup = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};


export const removeFromWishlist = (wishlistId) => {
  return fetch(`${BASE_URL}/wishlist/${wishlistId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};


export const login = (data) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const checkSession = () => {
  return fetch(`${BASE_URL}/check_session`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(response => {
      if (response.ok) {
        return {};
      } else {
        return response.json().then((error) => {
          throw new Error(error.message || 'Logout failed');
        });
      }
    })
    .catch(handleError);
};

export const fetchMyProducts = () => {
  return fetch(`${BASE_URL}/retailer_dashboard`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteProduct = (productId) => {
  return fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const addProduct = (data) => {
  return fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const updateProduct = (productId, data) => {
  return fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchProduct = (productId) => {
  return fetch(`${BASE_URL}/products/${productId}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchAllProducts = () => {
  return fetch(`${BASE_URL}/products`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const sendMessage = (data) => {
  return fetch(`${BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchPendingRetailers = () => {
  return fetch(`${BASE_URL}/admin_dashboard`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const approveRetailer = (retailerId) => {
  return fetch(`${BASE_URL}/approve_retailer/${retailerId}`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const rejectRetailer = (retailerId) => {
  return fetch(`${BASE_URL}/reject_retailer/${retailerId}`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchUsers = ({ role, status, search }) => {
  const query = new URLSearchParams();
  if (role) query.append('role', role);
  if (status) query.append('status', status);
  if (search) query.append('search', search);

  return fetch(`${BASE_URL}/users?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchRetailers = ({ status, search }) => {
  const query = new URLSearchParams();
  if (status) query.append('status', status);
  if (search) query.append('search', search);

  return fetch(`${BASE_URL}/retailers?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteUser = (userId) => {
  return fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchCategories = () => {
  return fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchUserProfile = (userId) => {
  return fetch(`${BASE_URL}/users/${userId}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .then(data => {
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Profile data is empty');
      }
      return data;
    })
    .catch(handleError);
};

export const fetchAllCategories = () => {
  return fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const recordSearchHistory = (searchTerm) => {
  return fetch(`${BASE_URL}/search_history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ search_term: searchTerm }),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchSearchHistory = () => {
  return fetch(`${BASE_URL}/search_history`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchMessages = () => {
  return fetch(`${BASE_URL}/messages`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const addToWishlist = (productId) => {
  return fetch(`${BASE_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product_id: productId }),
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};

export const fetchWishlist = () => {
  return fetch(`${BASE_URL}/wishlist`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
    .catch(handleError);
};
