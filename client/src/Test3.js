import React, { createContext, memo, useCallback, useContext, useMemo, useState } from 'react'
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
const Test3 = () => {
    const [count, setCount] = useState(0)
    const [data] = useState("static data")

    const factorial = (n) => {
        return n <= 1 ? 1 : n * factorial(n - 1)
    }
    const [number, setNumber] = useState(5);
    const [counter, setCounter] = useState(0);

    const calculatedFactorial = useMemo(() => factorial(number), [number]);
    const context = useContext(MyContext);
    console.log("Sub-Child Component:", context); // Same as above

    // With useCallback - only changes when dependencies change
    const handleClick = useCallback(() => {
        console.log('Clicked', count);
    }, [count]);
    return (
        <>
            <div>Test3</div>
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