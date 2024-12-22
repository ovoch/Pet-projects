import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../redux/actions';
import EditNote from './EditNote';
import { UserContext } from '../UserContext'; 

const Notes = () => {
  const { currentUser } = useContext(UserContext); 
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [editingNote, setEditingNote] = useState(null);

  const userNotes = notes.filter(note => note.userId === currentUser.id);

  
  const loadNotesFromLocalStorage = () => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      parsedNotes.forEach(note => {
        dispatch(updateNote(note)); 
      });
    }
  };

 
  useEffect(() => {
    loadNotesFromLocalStorage();
  }, [dispatch]);

  
  const handleUpdate = async (updatedNote) => {
    try {
      await fetch(`http://localhost:5000/notes/${updatedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      dispatch(updateNote(updatedNote)); 
      setEditingNote(null); 
      
      
      const updatedNotes = [...userNotes, updatedNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Ошибка при обновлении заметки:', error);
    }
  };

  
  const handleDelete = (id) => {
    dispatch(deleteNote(id));
    const updatedNotes = userNotes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes)); 
  };

  return (
    <div>
      <h2>Мои Заметки</h2>
      {editingNote ? (
        <EditNote
          note={editingNote}
          onUpdate={handleUpdate}
          onCancel={() => setEditingNote(null)}
        />
      ) : (
        <ul>
          {userNotes.map(note => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => setEditingNote(note)}>Редактировать</button>
              <button onClick={() => handleDelete(note.id)}>Удалить</button>
            </li>
          ))}
          {userNotes.length === 0 && <p>Заметок нет.</p>} 
        </ul>
      )}
    </div>
  );
};

export default Notes;