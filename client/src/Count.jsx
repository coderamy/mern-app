import React from 'react'

const Count = ({ count, setCount }) => {

    return (
        <div>

            <button onClick={() => setCount(count + 1)}>C count::{count}</button>
        </div>
    )
}

export default Count