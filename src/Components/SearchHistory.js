import React, { useState, useEffect } from 'react';
import { fetchSearchHistory } from './api.js';
import './SearchHistory.css';

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchSearchHistory()
      .then(data => setSearchHistory(data))
      .catch(error => {
        console.error('Failed to fetch search history:', error);
        setSearchHistory([]);
      });
  }, []);

  return (
    <div className="search-history-container">
      <h2>Your Search History</h2>
      {searchHistory.length > 0 ? (
        <ul className="search-history-list">
          {searchHistory.map((historyItem, index) => (
            <li key={index} className="search-history-item">
              {historyItem.search_term} - <span>{new Date(historyItem.searched_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history found.</p>
      )}
    </div>
  );
};

export default SearchHistory;
