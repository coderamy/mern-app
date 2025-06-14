import React from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ThemeProvider } from './App'

const Example = () => {
    const dd = useContext(ThemeProvider)
    const [count, setCount] = useState(0)
    const inputRef = useRef(null)
    useEffect(() => {
        console.log("Hello udeeffect", count, dd);

    }, [])

    const handle = () => {
        console.log(inputRef.current.value);
    }
    const data = [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" }
    ]
    data.push({ id: 4, name: "Amit" })
    return (
        <div>
            <input ref={inputRef} onChange={handle} />
            <input value={count} onChange={(e) => setCount(e.target.value)} />
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>

            {data.map(iteam => <li key={iteam.id}>{iteam.name}</li>)}
        </div>
    )
}

export default Example