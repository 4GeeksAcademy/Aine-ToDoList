import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
	const [toDoList, setToDoList] = useState([]);
	const [newToDo, setNewToDo] = useState("");
	const [showButton, setShowButton] = useState(false);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setToDoList([...toDoList, newToDo]);
			setNewToDo("");
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
							<div className=" inputWithButton">
								<input
									className="toDoInput form-control"
									type="text"
									value={toDo}
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
