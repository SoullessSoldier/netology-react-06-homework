import "./notes_form.css"

type TNotesFormProps = {
    onSubmit: (content: string) => void
}

const NotesForm: React.FC<TNotesFormProps> = ({onSubmit}) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const content = (formData.get("content") as string);
      onSubmit(content);
      form.reset();
    };
    return (
      <form className="notes-form" onSubmit={handleSubmit}>
        <div className="notes-form-inputwrapper">
          <label htmlFor="content" className="notes-form-label">
            New note
          </label>
          <textarea
            className="notes-textarea"
            name="content"
            id="content"
            maxLength={150}
          ></textarea>
          <button type="submit" className="notes-button notes-button-black">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    );
}

export default NotesForm;