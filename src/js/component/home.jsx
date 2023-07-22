import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const toDosApi = "https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/aine20";
  const [toDoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetch(toDosApi)
      .then(res => res.json())
      .then(data => setToDoList(data))
      .catch(err => console.error("Error al obtener los datos de la API:", err));
  }, []);

  const updateToDoList = (data) => {
    fetch(toDosApi, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newToDoItem = { label: newToDo, done: false };
      const updatedToDoList = [...toDoList, newToDoItem];
      setToDoList(updatedToDoList);
      setNewToDo("");
      updateToDoList(updatedToDoList); 
    }
  };

  const handleChange = (e) => {
    setNewToDo(e.target.value);
  };

  const handleInputClick = () => {
    setShowButton(true);
  };

  const deleteToDo = (index) => {
    const updatedList = [...toDoList];
    updatedList.splice(index, 1);
    setToDoList(updatedList);
    updateToDoList(updatedList);
  };

  let message;
  if (toDoList.length === 0) {
    message = "No hay ninguna tarea...";
  } else {
    message = "Puedes agregar más tareas...";
  }

  let toDos = toDoList.length;

  return (
    <>
      <h3 className="header text-center">To Do's List</h3>
      <div className="container-fluid">
        <div className="toDoBase">
          <input
            className="toDoInput form-control"
            type="text"
            placeholder={message}
            value={newToDo}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          {toDoList.map((toDo, index) => (
            <div key={index} className="toDoItem">
              <div className="inputWithButton">
                <input
                  className="toDoInput form-control"
                  type="text"
                  value={toDo.label}
                  readOnly
                  onClick={handleInputClick}
                />

                {showButton && (
                  <button
                    className="closeButton"
                    onClick={() => deleteToDo(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <p className="toDosCounter">Tienes {toDos} pendientes</p>
        </div>
      </div>
    </>
  );
};

export default Home;