import { useState } from "react";

function Dashboard() {

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [notes, setNotes] = useState([]);

  const [editIndex, setEditIndex] =
    useState(null);

  const addNote = () => {

    if (title === "" || description === "")
      return;

    const newNote = {
      title,
      description,
    };

    if (editIndex !== null) {

      const updatedNotes = [...notes];

      updatedNotes[editIndex] = newNote;

      setNotes(updatedNotes);

      setEditIndex(null);

    } else {

      setNotes([...notes, newNote]);

    }

    setTitle("");
    setDescription("");

  };

  const deleteNote = (index) => {

    const updatedNotes =
      notes.filter((item, i) => i !== index);

    setNotes(updatedNotes);

  };

  const editNote = (index) => {

    setTitle(notes[index].title);

    setDescription(
      notes[index].description
    );

    setEditIndex(index);

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          ✨ Notes App
        </h1>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={styles.input}
        />

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={styles.textarea}
        />

        <button
          onClick={addNote}
          style={styles.button}
        >

          {editIndex !== null
            ? "Update Note"
            : "Add Note"}

        </button>

        <div style={styles.notesContainer}>

          {notes.map((item, index) => (

            <div
              key={index}
              style={styles.noteCard}
            >

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <div>

                <button
                  onClick={() =>
                    editNote(index)
                  }
                  style={styles.editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteNote(index)
                  }
                  style={styles.deleteBtn}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

const styles = {

  container: {

    minHeight: "100vh",

    background:
      "linear-gradient(to right, #141e30, #243b55)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "20px",

  },

  card: {

    background: "white",

    padding: "30px",

    borderRadius: "15px",

    width: "500px",

    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.3)",

  },

  heading: {

    textAlign: "center",

    color: "#243b55",

  },

  input: {

    width: "100%",

    padding: "10px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid gray",

  },

  textarea: {

    width: "100%",

    height: "100px",

    padding: "10px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid gray",

  },

  button: {

    width: "100%",

    padding: "12px",

    background: "#243b55",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontSize: "16px",

  },

  notesContainer: {

    marginTop: "20px",

  },

  noteCard: {

    background: "#f4f4f4",

    padding: "15px",

    borderRadius: "10px",

    marginBottom: "15px",

  },

  editBtn: {

    background: "orange",

    color: "white",

    border: "none",

    padding: "8px 12px",

    marginRight: "10px",

    borderRadius: "5px",

    cursor: "pointer",

  },

  deleteBtn: {

    background: "red",

    color: "white",

    border: "none",

    padding: "8px 12px",

    borderRadius: "5px",

    cursor: "pointer",

  },

};

export default Dashboard;