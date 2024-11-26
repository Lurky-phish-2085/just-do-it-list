import TaskModel from "../data/taskModel";
import TaskComponent from "./Task";

type TaskListProps = {
  tasks: TaskModel[];
  onEdit?: (task: TaskModel) => void;
  onDelete?: (task: TaskModel) => void;
};

function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <>
      <section>
        {tasks.map((task, index) => {
          return (
            <TaskComponent
              key={index}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </section>
    </>
  );
}

export default TaskList;
