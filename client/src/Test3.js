import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { lazy, Suspense } from 'react';
import MyContext from './MyContext';

// const LazyComponent = lazy(() => import('./LazyComponent'));
const LazyComponent = lazy(() =>
    new Promise(resolve =>
        setTimeout(
            () => import('./LazyComponent').then(resolve),
            2000 // 2 second delay
        )
    )
);

const Expcost = memo(({ data }) => {
    console.log("data for memo", data);
    return <div>{data}</div>

})
const ChildComponent = memo(({ onClick }) => {
    console.log('ChildComponent rendered');
    return <button onClick={onClick}>Click me</button>;
});


/// logic testing 
let arr = [1, 2, 2, 3, 4, 4]
const func = (arr) => {
    // return [...new Set(arr)]
    const unq = arr.filter((item, index) => arr.indexOf(item) === index)
    return unq[unq.length - 1]
}
function isAnagram(str1, str2) {
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}
// const unq = [...new Map(arr2.map(item=>[item.id, item])).values()]

function fab(n) {    
    return n<=1? n : fab(n - 1) + fab(n - 2)
}
console.log("Full:= ", func(arr), fab(6));

/// logic testing 


const Test3 = () => {
    const [count, setCount] = useState(0)
    const [data] = useState("static data")

    const factorial = (n) => {
        return n <= 1 ? 1 : n * factorial(n - 1)
    }
    const [number, setNumber] = useState(9);
    const [counter, setCounter] = useState(0);

    const calculatedFactorial = useMemo(() => factorial(number), [number]);
    const context = useContext(MyContext);
    console.log("Sub-Child Component:", context); // Same as above

    // With useCallback - only changes when dependencies change
    const handleClick = useCallback(() => {
        console.log('Clicked', count);
    }, [count]);
    const ss = () => {
        console.log('hello');
        return 5

    }

    const data2 = [{ v: "Mango" }, { v: "Banana" }]

    data2.map((item, index) => {
        console.log(item.v, index);

    })

    const [value, setValue] = useState('')
    const inputRef = useRef()
    function handleClick2() {
        alert(inputRef.current.value)
    }
    return (
        <>
            <div>Test3 {ss()}</div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <input ref={inputRef} />
            <button onClick={handleClick2}>Unctolled</button>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
            <ChildComponent onClick={handleClick} />
            <div>
                Factorial of {number} is: {calculatedFactorial}
                <button onClick={() => setNumber(n => n + 1)}>Increment Number</button>
            </div>
            <div>
                Counter: {counter}
                <button onClick={() => setCounter(c => c + 1)}>Increment Counter</button>
            </div>
            <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
            <Expcost data={data} />
        </>
    )
}

export default Test3