import React from "react";
import { useContext } from "react";
import notecontext from "../context/notes/notecontext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function NoteItem(props) {
  const context = useContext(notecontext);
  const { deleteNote,} = context;
  const { note ,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        
        <div className="card-body">
          <h5 className="card-title text-center">{note.title}</h5>
          <p className="card-text text-center">
          {note.description}
          </p>
          <div className="icon d-flex justify-content-around">    
          <DeleteIcon color="secondary" onClick={()=>{deleteNote(note._id)}} />
          <EditIcon color="secondary" onClick={()=>{updateNote(note)}}/>
          </div>
         
        </div>
      </div>
      
      
    </div>
  );
}

export default NoteItem;
