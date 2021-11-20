import React from "react";
import { useState,useContext } from "react";
import notecontext from "../context/notes/notecontext";

export const AddNote = () => {
    const context = useContext(notecontext);
    const { addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"})
    const addBtn=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title:"",description:"",tag:"default"})
    }
    const handOnChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="form my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="exampleInputEmail1"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={handOnChange}
            />
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                onChange={handOnChange}
                style={{height: "100px"}}
                value={note.description}
                name="description"
              ></textarea>
              <label htmlFor="floatingTextarea2">Description</label>
            </div>
            
          </div>
          <div className="btn d-flex justify-content-center">
          <button type="submit" className="btn  btn-secondary btn-md" onClick={addBtn}>
            Add Note
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};
