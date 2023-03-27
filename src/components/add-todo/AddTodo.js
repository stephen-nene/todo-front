import React, { useState , useEffect} from "react";

function AddTodo({ profileData }) {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setUserId(profileData.session);
  }, [profileData.session]);

  const addTodo = () => {
    fetch("https://todos-yf5l.onrender.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: {
          title: title,
          summary: summary,
          user_id: userId,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Todo created: ", data);
        alert(data.message, "in createing task")
        // TODO: handle successful creation of new Todo
      })
      .catch((error) => {
        console.error("Error creating new Todo: ", error);
        // TODO: handle error while creating new Todo
      });
  };


  return (
    <div
      className="main"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Add Todo</h1>
      <div className="addtodo">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="To-Do title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
      </div>
      <button className="btn btn-outline-success" onClick={addTodo}>
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
