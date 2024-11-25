import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import TaskModel from "../data/taskModel";

type TaskInputProps = {
  onAdd: (task: TaskModel) => void;
};

function TaskInput({ onAdd }: TaskInputProps) {
  const [description, setDescription] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitTask = () => {
    if (description.length <= 0) {
      return;
    }

    onAdd(new TaskModel(description));
    setDescription("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitTask();
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        submitTask();
        break;
      case "Escape":
        inputRef.current?.blur();
        break;

      default:
        break;
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset role="group">
            <input
              ref={inputRef}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              name="task"
              type="text"
              placeholder="Enter new task"
              value={description}
              required
            />
            <input type="submit" value="Add" />
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default TaskInput;
