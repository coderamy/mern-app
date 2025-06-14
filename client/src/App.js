import React, { createContext } from 'react';
import './App.css';
import HomeComponent from './HomeComponent';
import MyContext from './MyContext';
import Example from './Example';
// const MyContext = createContext();
export const ThemeProvider = createContext('light')
function App() {
  return (
    <MyContext.Provider value={{ theme: 'dark' }}>
      <HomeComponent />
    </MyContext.Provider>

    // <ThemeProvider.Provider value='dark'>
    //   <Example />
    // </ThemeProvider.Provider>
  );

}

export default App;