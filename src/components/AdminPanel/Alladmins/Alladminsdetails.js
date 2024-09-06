import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Alladminsdetails.css';

const Alladminsdetails = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/admins`)
      .then(response => setAdmins(response.data))
      .catch(error => console.error('Error fetching admin data:', error));
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      axios.delete(`${BASE_URL}/users/${userId}`)
        .then(() => {
          setAdmins(admins.filter(admin => admin._id !== userId));
          alert('Admin deleted successfully');
        })
        .catch(error => console.error('Error deleting admin:', error));
    }
  };

  return (
    <div className='allAdmins-container'>
      <button onClick={() => navigate(-1)} className='back-button'>Back</button>
      <h1>All Admins</h1>

      <table className='admins-table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Update Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin._id}>
              <td>{admin.username}</td>
              <td>{admin.phonenumber}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <select
                  value={admin.role}
                  onChange={(e) => {
                    axios.put(`${BASE_URL}/users/${admin._id}/role`, { role: e.target.value })
                      .then(response => {
                        setAdmins(admins.map(a => a._id === admin._id ? response.data : a));
                        alert('Role updated successfully');
                      })
                      .catch(error => console.error('Error updating role:', error));
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                  <div className='delete'>
                    <button onClick={() => handleDelete(admin._id)}>Delete</button>
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alladminsdetails;
