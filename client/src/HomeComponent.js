import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PostsList } from './PostsList';
// import CommentsSection from './cc';
import Logic from './Logic';

export const Child = ({ test, onInc }) => {
    return <button onClick={onInc}>Click {test}</button>
}

const HomeComponent = () => {
    const [samples, setSamples] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // [...Array(3)].map((_, i) => {
    //     console.log("sss", i);

    // })
    // let obj = { a: 1, b: { c: 2 } };
    // let shallow = { ...obj }; // still references `b`
    // let deep = JSON.parse(JSON.stringify(obj)); // deep copy


    // Fetch samples from API
    useEffect(() => {
        const fetchSamples = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/samples');
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
            const response = await axios.post('http://localhost:5001/api/samples', formData);
            setSamples([...samples, response.data]);
            setFormData({ name: '', description: '' });
        } catch (err) {
            console.error('Error creating sample:', err);
        }
    };
    const [test, setTest] = useState(0)

    const Hello = ({ name }) => <h2>Hello, {name}</h2>

    const withWraped = (WraperComponent) => (props) => <WraperComponent {...props} />
    const Wrapcontainer = withWraped(Hello)
    // Wrap it
    const useDebounce = (value, delay) => {
        const [debounce, setDebounce] = useState(value)
        useEffect(() => {
            const handle = setTimeout(() => {
                setDebounce(value)
            }, delay);
            return () => clearTimeout(handle)
        }, [value, delay])
        return debounce
    }

    console.log("debouncing", useDebounce(formData.name, 5000));

    return (
        <div className="App">
            <header className="App-header">
                <h1>MERN Stack App </h1>
                <Wrapcontainer name="Amit" />
                <Logic />
                <Child test={test} onInc={() => setTest(test + 1)} />
                {/* <Test3 /> */}
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