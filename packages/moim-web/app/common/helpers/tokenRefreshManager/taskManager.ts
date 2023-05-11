type TaskType = (token?: string) => void;

export class TokenRefreshTaskManager {
  private static instance: TokenRefreshTaskManager | undefined;
  private tasks: TaskType[] = [];

  private isRefreshing: boolean = false;

  public constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new TokenRefreshTaskManager();
      return this.instance;
    }
  }

  public startRefreshing() {
    this.isRefreshing = true;
  }

  public finishRefreshing(token?: string) {
    this.isRefreshing = false;
    this.tasks.forEach(task => task(token));
    this.tasks = [];
  }

  public getIsRefreshing() {
    return this.isRefreshing;
  }

  public pushTask(task: TaskType) {
    this.tasks.push(task);
  }

  public pushTasks(tasks: TaskType[]) {
    this.tasks.push(...tasks);
  }

  public getTasks() {
    return this.tasks;
  }
}
