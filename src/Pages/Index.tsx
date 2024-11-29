import { useEffect, useState } from "react";
import DeleteDialog from "../Components/DeleteDialog";
import Header from "../Components/Header";
import TaskInput from "../Components/TaskInput";
import TaskList from "../Components/TaskList";
import TaskModel from "../data/taskModel";
import TaskRepository from "../data/taskRepository";

function Index() {
  const [tasks, setTasks] = useState(TaskModel.findAll());
  const [taskToDelete, setTaskToDelete] = useState<TaskModel | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const handleTaskRepoUpdate = (tasks: TaskModel[]) => {
      setTasks(tasks);
    };

    TaskRepository.initialize();
    TaskRepository.addListener(handleTaskRepoUpdate);
  }, []);

  const handleOnAdd = (task: TaskModel) => {
    task.save();
  };
  const handleOnEdit = (task: TaskModel) => {
    TaskModel.update(task.id!, new TaskModel(task.description, task.done));
  };
  const handleOnDelete = (task: TaskModel) => {
    setDeleteDialogOpen(true);
    setTaskToDelete(task);
  };
  const handleDeleteConfirmation = () => {
    TaskModel.delete(taskToDelete?.id!);
    setTaskToDelete(null);
    setDeleteDialogOpen(false);
  };
  const handleDeleteCancellation = () => {
    setTaskToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Header />
      <main>
        <TaskInput onAdd={handleOnAdd} />
        <TaskList
          tasks={tasks}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancellation}
        />
      </main>
    </>
  );
}

export default Index;
