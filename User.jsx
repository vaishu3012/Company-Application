import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Users = () => {
    const [users, setUsers]=useState([]);
    const [newUsers, setNewUsers] = useState('');

    useEffect(() => {
      axios.get('http:///localhost:8080/api/user')
          .then(response => {
              setUsers(response.data);
          })
          .catch(error => {
              console.error('Error fetching users:', error);
          });
  }, []);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUsers(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/api/users', newUsers)
          .then(response => {
              setUsers(prevState => [...prevState, response.data]);
              setNewUsers({});
          })
          .catch(error => {
              console.error('Error creating user:', error);
          });
  };
  return (
    <div>
      <h2>User</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}, {user.email}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
      <input type="text" name="id" value={newUsers.id || ''} onChange={handleInputChange} placeholder="Id" />
      <input type="text" name="username" value={newUsers.username || ''} onChange={handleInputChange} placeholder="Username" />
      <input type="email" name="email" value={newUsers.email || ''} onChange={handleInputChange} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Users;