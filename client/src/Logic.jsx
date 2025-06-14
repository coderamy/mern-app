import React, { useEffect, useRef, useState } from 'react'
import Count from './Count'

const Logic = () => {
    const [count, setCount] = useState(0)

    function outer() {
        let count = 0
        return function inner() {
            count++
        }
    }
    const puterrr = outer()
    puterrr()
    puterrr()
    puterrr()

    // hoisting
    // console.log("hoisting", a);
    // var a = 4
    // Currying
    function add(a) {

        return function (b) {
            return a + b
        }
    }

  

   
    // factory


    const useCounter = () => {
        const [count, setCount] = useState(0)
        const increment = () => setCount(c => c + 1)
        return { count, increment }
    }

    const { count: count2, increment } = useCounter()

   



    return (
        <div>

            count: {count2}
            <button onClick={increment}>+1</button>
            <input type='text' value={count} onChange={(e) => setCount(e.target.value)} />
            P count::{count}
            <Count count={count} setCount={setCount} />
        </div>
    )
}

export default Logic