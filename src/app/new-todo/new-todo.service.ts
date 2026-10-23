import { Service, signal } from '@angular/core';
import { Todo, TodoStatus } from './new-todo.model';


@Service()
export class NewTodoService {
  private nextId = 1;

  private readonly _todos = signal<Todo[]>([]); // Used internally
  readonly todos = this._todos.asReadonly(); // Exposed to the world

  add(name: string, content: string, statusId: string): void {
    name = name.trim();
    content = content.trim();

    if (!name || !content || !statusId) {
      return;
    }

    const todo: Todo = {
      id: this.nextId++,
      name: name,
      content: content,
      statusId
    };

    this._todos.update(arr => [...arr, todo]);
  }

  changeStatus(id: number, statusId: string): void {
    this._todos.update(arr =>
      arr.map(todo =>
        todo.id === id ? { ...todo, statusId } : todo
      )
    );
  }

  delete(id: number): void {
    this._todos.update(arr =>
      arr.filter(todo => todo.id !== id)
    );
  }

}
