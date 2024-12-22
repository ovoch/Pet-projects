import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/actions';
import { UserContext } from '../UserContext'; 

const CreateNote = () => {
  const { currentUser } = useContext(UserContext); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const newNote = { id: Date.now(), title, content, userId: currentUser.id };

    try {
    
      await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      
      dispatch(addNote(newNote));

      
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  return (
    <div>
      <h2>Создать Заметку</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Добавить Заметку</button>
      </form>
    </div>
  );
};

export default CreateNote;