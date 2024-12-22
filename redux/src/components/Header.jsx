import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <header style={headerStyle}>
      <nav>
        <ul style={navStyle}>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
          <li><Link to="/login">Вход</Link></li>
          <li><Link to="/notes">Заметки</Link></li>
        </ul>
      </nav>
      {currentUser && <p style={{ color: 'white' }}>Добро пожаловать, {currentUser.email}!</p>}
    </header>
  );
};


const headerStyle = {
  backgroundColor: '#282c34',
  padding: '10px',
  textAlign: 'center',
};

const navStyle = {
  listStyle: 'none',
  padding: 0,
};

export default Header;