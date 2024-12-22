import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import CreateNote from './components/CreateNote';
import Notes from './components/Notes';
import Header from './components/Header';
import Registration from './components/Registration';
import Login from './components/Login';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Header />
          <div>
            <h1>Приложение для Заметок</h1>
            <Routes>
              <Route path="/" element={<h2>Добро пожаловать!</h2>} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={
                <>
                  <CreateNote />
                  <Notes />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;