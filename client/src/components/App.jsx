import React, { useState ,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import ToDo from "./ToDo";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import { fetchNotes, addNote as addNoteToBackend, deleteNote as deleteNoteFromBackend } from '../api';

function App() {
  const [notes, setNotes] = useState([]);

  // function addNote(newNote) {
  //   setNotes((prevNotes) => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notesFromServer = await fetchNotes();
        setNotes(notesFromServer);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    getNotes();
  }, []);
  


  async function addNote(newNote) {
    try {
      const addedNote = await addNoteToBackend(newNote);
      setNotes((prevNotes) => [...prevNotes, addedNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  
  
  async function deleteNoteAndFetch(id) {
    try {
      await deleteNoteFromBackend(id);
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      alert('Failed to delete note: ' + error.message);
      console.error('Error deleting note:', error);
    }
  }
  
  
  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
  <Note
    key={noteItem.id}
    id={noteItem.id}
    title={noteItem.title}
    content={noteItem.content}
    onDelete={deleteNoteAndFetch}
  />
))}


      <ToDo />
      <Footer />
    </div>
  );
}

export default App;
