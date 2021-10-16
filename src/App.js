import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaTimes} from 'react-icons/fa';
import './App.css';

const App = () => {

  const [notesData, setNotesData] = useState([]);
  const newNoteInputBox = document.querySelector("#newNoteInputBox");

  const newNoteButtonClicked = () => {
    
    const note = newNoteInputBox.value.toString();
    
    if (note) {
      const notes = notesData;
      notes.push({ note });

      newNoteInputBox.value = "";

      localStorage.setItem("notes", JSON.stringify(notes));
      setNotesData(notesDat => [...notesDat]);

    }
  };

  const clearNoteButtonClicked = () => {
    
    localStorage.clear();
    setNotesData([]);

  }

  const deleteNoteButtonClicked = (key) => {
    
    const noteToDel = document.getElementById(`${key.key}`);
    let pToDel = noteToDel.getElementsByTagName('p');

    if (pToDel !== 'undefined' && pToDel !== 'null');
    
      pToDel = pToDel[0];
      
      let notes = notesData;
      notes = notes.filter(noteObject => noteObject.note !== pToDel.textContent);

      localStorage.setItem("notes", JSON.stringify(notes));
      setNotesData(notes);
  }

  useEffect(() => {
    let getNotes = localStorage.getItem("notes");
  
    if (getNotes !== '' && getNotes !== null){
      return setNotesData(JSON.parse(getNotes));
    }

    return setNotesData([]);  
  }, []);

  const Notes = (noteProp) => {
    return (
      noteProp.data.map((noteObject, key) => {
        return(
          <div key={key} id = {key} className = "note-card">
             <p>{noteObject.note}</p>
             <button className = "deleteNoteClickButton" onClick={() => deleteNoteButtonClicked({key})}><FaTimes /></button>
          </div>
        )
      })
    )
  };
    
  return (
    <>
      <div className = "container">
        <div className = "newNoteInput">
          <input type = "text" id="newNoteInputBox" placeholder = "Enter a new note..."/>
          <button id = "newNoteClickButton" onClick={() => newNoteButtonClicked()}><FaPlus /></button>
          <button id = "clearNoteClickButton" onClick={() => clearNoteButtonClicked()}><FaTrash /></button>
        </div>
        <div className = "notes">
          <Notes data={notesData} />
        </div>
      </div>
    </>
  );
}

export default App;