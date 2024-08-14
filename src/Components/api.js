const BASE_URL = 'http://localhost:5000';

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

export const login = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const responseData = await handleResponse(response);

    // Check if the response contains a token
    if (responseData.token) {
      // Store the token in local storage
      localStorage.setItem('authToken', responseData.token);
    }

    return responseData;
  } catch (error) {
    handleError(error);
    throw error;
  }
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

export async function fetchUserProfile(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    throw error; // Re-throw to handle in the component
  }
} 

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

export const fetchMessages = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Get the token from local storage
    const response = await fetch(`${BASE_URL}/messages`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
};

