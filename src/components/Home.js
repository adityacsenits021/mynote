import React from "react";
// import { useContext } from "react";
// import notecontext from "../context/notes/notecontext";

import { Notes } from "./Notes";

export default function Home(props) {
  const {showAlert}=props;
  // const context = useContext(notecontext);
  // const { notes, setnotes } = context;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
}
