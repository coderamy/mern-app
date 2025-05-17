import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Test3 from './Test3';
import { PostsList } from './PostsList';

const HomeComponent = () => {
    const [samples, setSamples] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Fetch samples from API
    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/samples');
                setSamples(response.data);
            } catch (err) {
                console.error('Error fetching samples:', err);
            }
        };

        fetchSamples();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/samples', formData);
            setSamples([...samples, response.data]);
            setFormData({ name: '', description: '' });
        } catch (err) {
            console.error('Error creating sample:', err);
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>MERN Stack App</h1>
                <Test3 />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Sample</button>
                </form>

                <h2>Samples2</h2>
                <ul>
                    {samples.map((sample) => (
                        <li key={sample._id}>
                            <strong>{sample.name}</strong>: {sample.description}
                        </li>
                    ))}
                </ul>
            </header>
            <PostsList />
        </div>
    )
}

export default HomeComponent