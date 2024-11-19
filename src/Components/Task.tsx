import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";

type TaskProps = {
  key: number;
  name: string;
};

function Task({ name }: TaskProps) {
  const [done, setDone] = useState(false);
  const [editing, setEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [newTaskName, setNewTaskName] = useState(name);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setDone(e.target.checked);
  };
  const handleEditClick = () => {
    setEditing((prevState) => {
      return !prevState;
    });

    if (editing) setTaskName(newTaskName);
  };
  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };
  const handleEditInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleEditClick();
  };

  return (
    <>
      <article>
        <nav>
          <input
            onChange={handleCheck}
            style={{ width: "42px", height: "42px" }}
            type="checkbox"
          />
          {editing ? (
            <input
              onKeyUp={handleEditInputKeyUp}
              onChange={handleEditInputChange}
              style={{
                marginLeft: "8px",
                marginRight: "8px",
                textAlign: "center",
              }}
              type="text"
              value={newTaskName}
              autoFocus
              required
            />
          ) : (
            <h3 style={done ? { textDecoration: "line-through" } : {}}>
              {taskName}
            </h3>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            <PrimaryButton onClick={handleEditClick}>
              {editing ? <AiOutlineCheck /> : <FaEdit />}
            </PrimaryButton>
            <PrimaryButton>
              <AiFillDelete />
            </PrimaryButton>
          </div>
        </nav>
      </article>
    </>
  );
}

export default Task;
