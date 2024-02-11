import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/clients')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/clients', newClient)
            .then(response => {
                setClients(prevState => [...prevState, response.data]);
                setNewClient({});
            })
            .catch(error => {
                console.error('Error creating client:', error);
            });
    };

    return (
        <div>
            {/* <h1>Clients</h1> */}
            <ul>
                {clients.map(client => (
                    <li key={client.id}>{client.name} - {client.email} - {client.phone}</li>
                ))}
            </ul>
            <h2>Add New Client</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={newClient.name || ''} onChange={handleInputChange} placeholder="Name" />
                <input type="email" name="email" value={newClient.email || ''} onChange={handleInputChange} placeholder="Email" />
                <input type="tel" name="phone" value={newClient.phone || ''} onChange={handleInputChange} placeholder="Phone" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Clients;