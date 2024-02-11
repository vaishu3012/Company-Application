import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompanies, setNewCompanies]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/companies')
        .then(response => {
            setCompanies(response.data);
        })
        .catch(error => {
            console.error('Error fetching companies:', error);
        });
}, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCompanies(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/api/companies', newCompanies)
          .then(response => {
              setCompanies(prevState => [...prevState, response.data]);
              setNewCompanies({});
          })
          .catch(error => {
              console.error('Error creating companies:', error);
          });
  };
  
  return (
    <div>
      <h2>Companies</h2>
     <ul>
      {companies.map(company => (
        <li key={company.id}>{company.name}</li>
      ))}
    </ul>
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" value={newCompanies.id || ''} onChange={handleInputChange} placeholder="Id" />
      <input type="text" name="name" value={newCompanies.name || ''} onChange={handleInputChange} placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default Companies