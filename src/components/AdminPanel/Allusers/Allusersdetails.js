// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Allusersdetails.css';

// const Allusersdetails = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     axios.get(`${BASE_URL}/users/non-admins`)
//       .then(response => setUsers(response.data))
//       .catch(error => console.error('Error fetching user data:', error));
//   }, []);

//   const handleDelete = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       axios.delete(`${BASE_URL}/users/${userId}`)
//         .then(() => {
//           setUsers(users.filter(user => user._id !== userId));
//           alert('User deleted successfully');
//         })
//         .catch(error => console.error('Error deleting user:', error));
//     }
//   };

//   return (
//     <div className='allUsers-container'>
//       <button onClick={() => navigate(-1)} className='back-button'>Back</button>
//       <h1>All Users</h1>

//       <table className='users-table'>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Phone Number</th>
//             <th>Email</th>
//             {/* <th>Role</th> */}
//             <th>Update Role</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.username}</td>
//               <td>{user.phonenumber}</td>
//               <td>{user.email}</td>
//               {/* <td>{user.role}</td> */}
//               <td>
//                 <select
//                   value={user.role}
//                   onChange={(e) => {
//                     axios.put(`${BASE_URL}/users/${user._id}/role`, { role: e.target.value })
//                       .then(response => {
//                         setUsers(users.map(u => u._id === user._id ? response.data : u));
//                         alert('Role updated successfully');
//                       })
//                       .catch(error => console.error('Error updating role:', error));
//                   }}
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </td>
//               <td>
//                 <div className='delete'>
//                 <button onClick={() => handleDelete(user._id)}>Delete</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Allusersdetails;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Allusersdetails.css';

const Allusersdetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/users/non-admins`)
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    // Filter users based on search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const result = users.filter(user => {
      const username = user.username ? user.username.toLowerCase() : '';
      // Convert phone number to string and then to lowercase
      const phoneNumber = user.phonenumber ? user.phonenumber.toString().toLowerCase() : '';
      return username.includes(lowercasedQuery) || phoneNumber.includes(lowercasedQuery);
    });
    setFilteredUsers(result);
  }, [searchQuery, users]);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`${BASE_URL}/users/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userId));
          setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
          alert('User deleted successfully');
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  return (
    <div className='allUsers-container'>
      <button onClick={() => navigate(-1)} className='back-button'>Back</button>
      <h1>All Users</h1>

      {/* Search field */}
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search by username or phone number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-input'
        />
      </div>

      <table className='users-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Update Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => {
                    axios.put(`${BASE_URL}/users/${user._id}/role`, { role: e.target.value })
                      .then(response => {
                        setUsers(users.map(u => u._id === user._id ? response.data : u));
                        setFilteredUsers(filteredUsers.map(u => u._id === user._id ? response.data : u));
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
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allusersdetails;
