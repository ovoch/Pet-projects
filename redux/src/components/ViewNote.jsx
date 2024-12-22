import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const NoteList = ({ notes, setNotes }) => {
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get('http://localhost:5000/notes');
            setNotes(response.data);
        };
        fetchNotes();
    }, [setNotes]);

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    notes: state.notes.notes,
});

export default connect(mapStateToProps, { setNotes })(NoteList);