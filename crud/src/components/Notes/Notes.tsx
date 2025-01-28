import { useEffect, useState } from "react";
import "./notes.css";
import { TNote } from "@/types/note";
import Note from "@/components/Note/Note";
import NotesForm from "@/components/NotesForm/NotesForm";
import { deleteData, getData, postData } from "@/utils/api_functions";

const Notes = () => {
  const [notesState, setNotesState] = useState<TNote[]>([]);

  const refreshData = async () => {
    const data = await getData();
    setNotesState([...data]);
  };

  const handleNotesFormSubmit = async (content: string) => {
    await postData(content);
    refreshData();
  };

  const handleNoteDelete = async (id: number) => {
    await deleteData(id);
    refreshData();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">Notes</h2>
        <button
          className="notes-button notes-button-green"
          onClick={refreshData}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </button>
      </div>
      <div className="notes-content">
        {notesState.map((note) => (
          <Note key={note.id} data={note} onNoteDelete={handleNoteDelete} />
        ))}
      </div>
      <NotesForm onSubmit={handleNotesFormSubmit} />
    </div>
  );
};

export default Notes;
