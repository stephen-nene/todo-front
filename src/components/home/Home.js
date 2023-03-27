import React, { useState, useEffect } from "react";
import "./home.css";
import Delete from "../../images/delete.png";
import Update from "../../images/update.png";
import Done from "../../images/done.png";

export default function Home({ userId }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== id)
          );
          console.log("Delete todo successful");
        } else {
          throw new Error("Delete todo failed");
        }
      })
      .catch((error) => console.error(error));
  };

  const updateTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, editing: true } : todo
      )
    );
    console.log("update Todo successful");
  };

  const doneEditingTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, editing: false } : todo
      )
    );
    console.log("done editing Todo successful");
  };

  const refresh = () => {
    fetch(`http://localhost:3000/todos?user_id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data.data);
        console.log("refreshed todos:", data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="main">
      <h1>TO-DOs</h1>
      <button onClick={refresh}>refresh</button>

      {todos &&
        todos.map((todo) => (
          <div className="todos" key={todo.id} data-id={todo.id}>
            {/* <p>{todo.id}</p> */}
            <input
              className="title"
              value={todo.title}
              type="text"
              disabled={!todo.editing}
              onChange={(e) =>
                setTodos((prevTodos) =>
                  prevTodos.map((t) =>
                    t.id === todo.id ? { ...t, title: e.target.value } : t
                  )
                )
              }
            />
            <input
              className="summary"
              type="text"
              value={todo.summary}
              disabled={!todo.editing}
              onChange={(e) =>
                setTodos((prevTodos) =>
                  prevTodos.map((t) =>
                    t.id === todo.id ? { ...t, summary: e.target.value } : t
                  )
                )
              }
            />
            <div className="button-container">
              {todo.editing ? (
                <button id="done" onClick={() => doneEditingTodo(todo.id)}>
                  <img className="icons" id="done" src={Done} alt="done-icon" />
                </button>
              ) : (
                <button id="update" onClick={() => updateTodo(todo.id)}>
                  <img
                    className="icons"
                    id="update"
                    src={Update}
                    alt="update-icon"
                  />
                </button>
              )}
              <button id="delete" onClick={() => deleteTodo(todo.id)}>
                <img
                  className="icons"
                  id="delete"
                  src={Delete}
                  alt="delete-icon"
                />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
