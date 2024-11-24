import TaskRepository from "./TaskRepository";

class Task {
  public id?: number | null;
  public description: string;
  public done: boolean;

  public constructor(
    description: string,
    done: boolean,
    id: number | null = null
  ) {
    this.description = description;
    this.done = done;
    this.id = id;
  }

  public static findAll(): Task[] {
    return TaskRepository.instance();
  }

  public static findById(id: number): Task {
    const db: Task[] = TaskRepository.instance();

    return db.filter((task) => task.id === id)[0];
  }

  public static update(id: number, taskUpdate: Task): Task {
    if (!this.findById(id)) {
      throw new Error(`Task with id: ${id} not found.`);
    }

    const db: Task[] = TaskRepository.instance();
    taskUpdate.id = id;
    const oldTask: Task = db.splice(this.findIndexOf(id), 1, taskUpdate)[0];
    TaskRepository.update(db);

    return oldTask;
  }

  public static delete(id: number): Task {
    if (!this.findById(id)) {
      throw new Error(`Task with id: ${id} not found.`);
    }

    const db: Task[] = TaskRepository.instance();
    const deletedTask: Task = db.splice(this.findIndexOf(id), 1)[0];
    TaskRepository.update(db);

    return deletedTask;
  }

  public static size(): number {
    return TaskRepository.instance().length;
  }

  static isEmpty(): boolean {
    return TaskRepository.instance().length === 0;
  }

  public save() {
    const db: Task[] = TaskRepository.instance();
    const newTask: Task = JSON.parse(JSON.stringify(this));
    newTask.id = 1;

    if (!Task.isEmpty()) {
      const lastTask: Task = db[db.length - 1];
      newTask.id = lastTask.id! + 1;
    }

    db.push(newTask);

    TaskRepository.update(db);
  }

  private static findIndexOf(id: number): number {
    const db: Task[] = TaskRepository.instance();
    let elementIndex: number | null = null;

    db.forEach((task, index) => {
      if (task.id === id) {
        elementIndex = index;
      }
    });

    return elementIndex || -1;
  }
}

export default Task;
