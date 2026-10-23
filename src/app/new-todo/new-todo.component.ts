import { Component, computed, inject, signal } from '@angular/core';
import { NewTodoService } from './new-todo.service';
import { Todo, TodoStatus } from './new-todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-new-todo',
  styleUrl: './new-todo.component.css',
  templateUrl: './new-todo.component.html',
})
export class NewTodoComponent {
  private readonly todoService = inject(NewTodoService);

  // Konna najmou na3mlou banana in a box, but since it requires using Signals, here is it
  readonly name = signal('');
  readonly content = signal('');
  readonly todos = this.todoService.todos; // reference

  // La3ba walet generique 🧂
  readonly statuses: TodoStatus[] = [
    { id: 'todo', label: 'To Do', color: '#64748b', order: 1 },
    { id: 'progress', label: 'In Progress', color: '#2563eb', order: 2 },
    { id: 'review', label: 'In Review', color: '#ff0000', order: 3 },
    { id: 'done', label: 'Done', color: '#16a34a', order: 4 }
  ];
  readonly defaultStateId = 'todo';

  // Mchay5inha Signals
  readonly todosByStatus = computed(() => {
    const grouped: Record<string, Todo[]> = {};

    for (const status of this.statuses) {
      grouped[status.id] = [];
    }

    for (const todo of this.todos()) {
      grouped[todo.statusId].push(todo);
    }

    return grouped;
  });

  addTodo(): void {
    this.todoService.add(
      this.name(),
      this.content(),
      this.defaultStateId
    );

    if (!this.name().trim()) {
      return;
    }

    this.name.set('');
    this.content.set('');
  }

  changeStatus(id: number, statusId: string): void {
    this.todoService.changeStatus(id, statusId);
  }

  deleteTodo(id: number): void {
    this.todoService.delete(id);
  }
}
