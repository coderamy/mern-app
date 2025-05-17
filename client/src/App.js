import React, { createContext } from 'react';
import './App.css';
import HomeComponent from './HomeComponent';
import MyContext from './MyContext';
// const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value={{ theme: 'dark' }}>
      <HomeComponent />
    </MyContext.Provider>
  );

}

export default App;