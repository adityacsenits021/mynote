import React, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost";

  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);
  // Get all notes
  const getAllNotes = async () => {
    //  api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const json=await response.json();
    console.log(json);
    setnotes(json);
    };
  
  
  // Add a note
  const addNote = async (title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    // const JSON = response.JSON();
    
    const note = await response.json()
    setnotes(notes.concat(note));
  };
  // Delete a note
  const deleteNote =async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5MGI4NDE0ZjI4YjE5YjA0MjE0YWRlIn0sImlhdCI6MTYzNjg3NjEwM30.dnPujq10l9APTCKOwPfc4EZMVBifVj5muaSpY2CqLz8",
      },
      
      
    });
    
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5MGI4NDE0ZjI4YjE5YjA0MjE0YWRlIn0sImlhdCI6MTYzNjg3NjEwM30.dnPujq10l9APTCKOwPfc4EZMVBifVj5muaSpY2CqLz8",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    // const JSON = response.JSON();
    //Logic to edit in client
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes,getAllNotes, setnotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
