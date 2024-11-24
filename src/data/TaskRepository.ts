import TaskModel from "./TaskModel";

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

  public static addListener(listener: () => void) {
    this.listeners.push(listener);
    console.log("listeners size: " + this.listeners.length);
  }

  public static removeListener(listener: () => void) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
    console.log("listeners size: " + this.listeners.length);
  }

  private static notify() {
    if (this.listeners.length === 0) {
      return;
    }

    for (const listener of this.listeners) {
      listener();
    }
  }
}

export default TaskRepository;
