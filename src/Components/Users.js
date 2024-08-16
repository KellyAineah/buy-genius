import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from './api';
import './Users.css';

const Users = ({ theme }) => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    fetchUsers({ role, search })
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [role, search]);

  const handleDelete = (userId) => {
    if (selectedUser && selectedUser.is_admin) {
      alert("Cannot delete an admin user.");
      return;
    }

    deleteUser(userId)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
        closeDeleteConfirm();
      })
      .catch(error => {
        console.error(`Error deleting user ${userId}:`, error);
      });
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className={`unique-users-container ${theme}`}>
      <h2 className="unique-users-heading">Users</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="unique-users-search-input"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="unique-users-role-select"
      >
        <option value="">All Roles</option>
        <option value="User">User</option>
        <option value="Retailer">Retailer</option>
        <option value="Admin">Admin</option>
      </select>
      <table className="unique-users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Signup Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>
                  {user.username
                    ? `${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`
                    : 'N/A'}
                </td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  {user.is_admin
                    ? 'Admin'
                    : user.is_retailer
                    ? 'Retailer'
                    : 'User'}
                </td>
                <td>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>
                  <button className="unique-users-action-button unique-users-view-button" onClick={() => openModal(user)}>View Details</button>
                  <button className="unique-users-action-button unique-users-delete-button" onClick={() => openDeleteConfirm(user)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* View Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="unique-custom-modal-overlay" onClick={closeModal}>
          <div className="unique-custom-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedUser.username}</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.is_admin ? 'Admin' : selectedUser.is_retailer ? 'Retailer' : 'User'}</p>
            <p>Signup Date: {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : 'N/A'}</p>
            <button onClick={closeModal} className="unique-users-action-button unique-users-close-button">Close</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && selectedUser && (
        <div className="unique-custom-modal-overlay" onClick={closeDeleteConfirm}>
          <div className="unique-custom-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Are you sure you want to delete this user?</h2>
            <p>{selectedUser.username}</p>
            <div>
              <button onClick={() => handleDelete(selectedUser.id)} className="unique-users-action-button unique-users-delete-button">Yes, Delete</button>
              <button onClick={closeDeleteConfirm} className="unique-users-action-button unique-users-close-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
