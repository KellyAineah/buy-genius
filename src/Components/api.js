const BASE_URL = 'http://localhost:5000';

// function to handle responses
const handleResponse = (response) => {
  if (response.ok) {
    return response.json().catch(() => ({})); 
  } else {
    return response.json().then((error) => {
      throw new Error(error.message || 'Something went wrong');
    });
  }
};

// function to handle errors
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
  console.log('Adding product with data:', data);
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
