import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";
import TaskModel from "../data/TaskModel";

type TaskProps = {
  key?: number;
  task: TaskModel;
  onEdit?: (task: TaskModel) => void;
  onDelete?: (task: TaskModel) => void;
};

function TaskComponent({ task, onEdit, onDelete }: TaskProps) {
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleCheck = () => {
    task.done = !task.done;
    if (onEdit) onEdit(task);
  };
  const handleEditClick = () => {
    setEditing((prevState) => {
      return !prevState;
    });

    if (editing) {
      task.description = newDescription;
      if (onEdit) onEdit(task);
    }
  };
  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };
  const handleEditInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        handleEditClick();
        break;

      case "Escape":
        setEditing(false);
        setNewDescription(task.description);
        break;

      default:
        break;
    }
  };
  const handleDeleteClick = () => {
    if (onDelete) onDelete(task);
  };

  return (
    <>
      <article>
        <nav>
          {task.done ? (
            <input
              onChange={handleCheck}
              style={{ width: "42px", height: "42px" }}
              type="checkbox"
              checked
            />
          ) : (
            <input
              onChange={handleCheck}
              style={{ width: "42px", height: "42px" }}
              type="checkbox"
            />
          )}
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
              value={newDescription}
              autoFocus
              required
            />
          ) : (
            <h3 style={task.done ? { textDecoration: "line-through" } : {}}>
              {task.description}
            </h3>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            <PrimaryButton onClick={handleEditClick}>
              {editing ? <AiOutlineCheck /> : <FaEdit />}
            </PrimaryButton>
            <PrimaryButton onClick={handleDeleteClick}>
              <AiFillDelete />
            </PrimaryButton>
          </div>
        </nav>
      </article>
    </>
  );
}

export default TaskComponent;
