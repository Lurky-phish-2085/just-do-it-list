import TaskComponent from "./Task";
import TaskModel from "../data/TaskModel";

type TaskListProps = {
  tasks: TaskModel[];
  onEdit?: (task: TaskModel) => void;
  onDelete?: (task: TaskModel) => void;
};

function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <>
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
    </>
  );
}

export default TaskList;
