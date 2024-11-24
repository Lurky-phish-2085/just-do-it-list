import TaskModel from "./TaskModel";

const TASK_REPOSITORY_ITEM = "tasks";

class TaskRepository {
  public static instance(): TaskModel[] {
    const tasks: TaskModel[] = JSON.parse(
      localStorage.getItem(TASK_REPOSITORY_ITEM) || "[]"
    );

    return tasks;
  }

  public static update(db: TaskModel[]): void {
    localStorage.setItem(TASK_REPOSITORY_ITEM, JSON.stringify(db));
  }

  public static initialize(initialData: TaskModel[] = []): void {
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
