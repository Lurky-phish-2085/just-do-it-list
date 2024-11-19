import Task from "./Task";

type TaskListProps = {
  tasks: string[];
};

function TaskList({ tasks }: TaskListProps) {
  return (
    <>
      {tasks.map((task, index) => {
        return <Task key={index} name={task} />;
      })}
    </>
  );
}

export default TaskList;
