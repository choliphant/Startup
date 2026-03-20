import React, { useState, useEffect } from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { Question } from './question/question.jsx';
import { Queue } from './queue/queue.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('username'));
    };

    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  function logout(){
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }

  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <h1 id="Title">THE ULTIMATE HELP QUEUE</h1>
          <nav>
            <div className="menu-items">
              <NavLink className='nav-link' to='question'>Ask A Question</NavLink>
              <NavLink className='nav-link' to='queue'>Queue</NavLink>
              {isLoggedIn && (
                <button type="submit" onClick={() => logout()}>Logout</button>
              )}
            </div>
          </nav>
        </header>
        <Routes className="main-content">
          <Route path='/' element={<Login />} />
          <Route path='/question' element={<Question />} />
          <Route path='/queue' element={<Queue />} />
        </Routes>
        <footer>
          <div className="name">Charles Oliphant</div>
          <div><a href="https://github.com/chuckth3truck/Startup">GitHub</a></div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;