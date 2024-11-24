import Task from "./Task";

const TASK_REPOSITORY_ITEM = "tasks";

class TaskRepository {
  public static instance(): Task[] {
    const tasks: Task[] = JSON.parse(
      localStorage.getItem(TASK_REPOSITORY_ITEM) || "[]"
    );

    return tasks;
  }

  public static update(db: Task[]): void {
    localStorage.setItem(TASK_REPOSITORY_ITEM, JSON.stringify(db));
  }

  public static initialize(initialData: Task[] = []): void {
    const repoExist = localStorage.getItem(TASK_REPOSITORY_ITEM);

    if (repoExist) {
      return;
    }

    const data = initialData.map((task, index) => {
      task.id = index + 1;
      return task;
    });

    localStorage.setItem(TASK_REPOSITORY_ITEM, JSON.stringify(data));
  }
}

export default TaskRepository;
