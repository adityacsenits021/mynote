import React from "react";
import { useContext, useEffect, useRef,useState } from "react";
import notecontext from "../context/notes/notecontext";
import NoteItem from "./NoteItem";
import { AddNote } from "./AddNote";
import { useHistory } from "react-router";
export const Notes = () => {
  let history=useHistory();
  const [note, setnote] = useState({_id:"",title:"",description:"",tag:"default"})
  const handOnChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
  e.preventDefault();
  editNote(note._id,note.title, note.description, note.tag);
  refclose.current.click();
}
  const context = useContext(notecontext);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote(currentNote);
  };
  const ref = useRef(null);
  const refclose = useRef(null);
  const { notes, getAllNotes,editNote } = context;
  useEffect(() => {
   if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      history.push("/login")
    }
    
  }, []);
  return (
    
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={note.title}
                    className="form-control"
                    id="exampleInputEmail1"
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
                      style={{ height: "100px" }}
                      name="description"
                      value={note.description}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                  </div>
                </div>
                <div className="btn d-flex justify-content-center">
                  
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick}type="button" className="btn btn-primary">
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Your Notes</h2>
        <div className="row my-3 d-flex justify-content-center">
          {notes.length===0&&"No notes to display"}
          {notes.map((note) => {
            return <NoteItem note={note} updateNote={updateNote} />;
          })}
        </div>
      </div>
    </>
  );
};
