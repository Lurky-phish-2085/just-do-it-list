import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { RiGitRepositoryLine } from "react-icons/ri";
import Dialog from "../Components/Dialog";
import DialogTypes from "../Components/enums/dialogTypes";
import Header from "../Components/Header";
import TaskInput from "../Components/TaskInput";
import TaskList from "../Components/TaskList";
import TaskModel from "../data/taskModel";
import TaskRepository from "../data/taskRepository";

function Index() {
  const [tasks, setTasks] = useState(TaskModel.findAll());
  const [taskToDelete, setTaskToDelete] = useState<TaskModel | null>(null);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
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
    console.log("DILog open");
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
      <Header onAbout={() => setAboutDialogOpen(true)} />
      <main>
        <TaskInput onAdd={handleOnAdd} />
        <TaskList
          tasks={tasks}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
      </main>
      {aboutDialogOpen && (
        <Dialog
          type={DialogTypes.INFO}
          onAccept={() => setAboutDialogOpen(false)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: 0 }}>Just Do It</h1>
            <p>just another to do list</p>
            <p>Yes, another to do list app to try React for the first time.</p>
            <div>
              <RiGitRepositoryLine />
              <a
                style={{ marginLeft: 8 }}
                href="https://github.com/Lurky-phish-2085/just-do-it-list"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repository
              </a>
            </div>
            <div>
              <BsGithub />
              <a
                style={{ marginLeft: 8 }}
                href="https://github.com/Lurky-phish-2085"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check out my Github profile!
              </a>
            </div>
          </div>
        </Dialog>
      )}
      {deleteDialogOpen && (
        <Dialog
          type={DialogTypes.WARNING}
          acceptButtonText="Delete"
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancellation}
        >
          <p>
            Are you sure you want to permanently delete this task? Once deleted,
            it cannot be recovered.
          </p>
        </Dialog>
      )}
    </>
  );
}

export default Index;
