import React, { useState, useEffect } from 'react';
import './NotesApp.css';


function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleTitleChange = (event) => {
    setNewNoteTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewNoteContent(event.target.value);
  };

  const handleAddNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteContent.trim() !== '') {
      const updatedNotes = [...notes, { title: newNoteTitle, content: newNoteContent }];
      setNotes(updatedNotes);
      setNewNoteTitle('');
      setNewNoteContent('');
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="bigdiv">
      <h1 className="title">Notes App</h1>
      <div className="inputandbtn">
        <input className="inputnote" type="text" placeholder="Note Title" value={newNoteTitle} onChange={handleTitleChange} />
        <input className="inputnote1" placeholder=" Note Content" value={newNoteContent} onChange={handleContentChange} />
        <button class="button-84" onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-container">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button className="deletebtn" onClick={() => handleDeleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesApp;