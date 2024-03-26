import React, { useContext, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import Navbar from "./components/navbar/Navbar";
import { observer } from 'mobx-react-lite'
import { Context } from './index';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token') === false) {
      check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <header>
        {!!localStorage.getItem('token') && (
          <Navbar/>
        )}    
      </header>
      <div className="App">
          <AppRouter/>
      </div>
    </Router>
  );
})

export default App;
