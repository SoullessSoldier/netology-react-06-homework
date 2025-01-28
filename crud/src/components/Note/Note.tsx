import { TNote } from "@/types/note";
import "./note.css";

type TNoteProps = {
    data: TNote,
    onNoteDelete: (id: number) => void,
}

const Note: React.FC<TNoteProps> = ({ data, onNoteDelete }) => {
    const handleNoteDelete = (id: number) => {
        onNoteDelete(id);
    }
  return (
    <div className="note">
      <p className="note-content">{data.content}</p>
      <button className="notes-button notes-button-red" onClick={() => handleNoteDelete(data.id)}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Note;
