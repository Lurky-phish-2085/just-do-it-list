import TaskModel from "./taskModel";

const TASK_REPOSITORY_ITEM = "tasks";

class TaskRepository {
  private static listeners: Array<Function> = [];

  public static instance(): TaskModel[] {
    const tasks: TaskModel[] = JSON.parse(
      localStorage.getItem(TASK_REPOSITORY_ITEM) || "[]"
    );

    return tasks;
  }

  public static initialize(data: TaskModel[] = []): void {
    const repoExist = localStorage.getItem(TASK_REPOSITORY_ITEM);

    if (repoExist) {
      return;
    }

    const initialData = data.map((task, index) => {
      task.id = index + 1;
      return task;
    });

    this.update(initialData);
  }

  public static update(db: TaskModel[]): void {
    localStorage.setItem(TASK_REPOSITORY_ITEM, JSON.stringify(db));
    this.notify();
  }

  public static addListener(listener: (tasks: TaskModel[]) => void) {
    this.listeners.push(listener);
  }

  public static removeListener(listener: (tasks: TaskModel[]) => void) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }

  private static notify() {
    if (this.listeners.length === 0) {
      return;
    }

    for (const listener of this.listeners) {
      listener(this.instance());
    }
  }
}

export default TaskRepository;
