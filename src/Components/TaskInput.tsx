import { ChangeEvent, FormEvent, useState } from "react";

function TaskInput() {
  const [taskName, setTaskName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(taskName);
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset role="group">
            <input
              onChange={handleChange}
              name="task"
              type="text"
              placeholder="Enter new task"
              value={taskName}
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
