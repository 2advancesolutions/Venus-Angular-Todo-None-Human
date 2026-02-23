import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Todo {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoListComponent {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Complete Angular Tutorial',
      description: 'Learn Angular basics including components, services, and routing'
    },
    {
      id: 2,
      title: 'Build Todo Application',
      description: 'Create a fully functional todo app with CRUD operations'
    },
    {
      id: 3,
      title: 'Deploy to Production',
      description: 'Set up CI/CD pipeline and deploy the application to a hosting platform'
    },
    {
      id: 4,
      title: 'Write Unit Tests',
      description: 'Add comprehensive test coverage for all components and services'
    }
  ];

  doneTodos: Todo[] = [];

  newTodoTitle: string = '';
  newTodoDescription: string = '';
  
  editingTodoId: number | null = null;
  editTodoTitle: string = '';
  editTodoDescription: string = '';

  addTodo(): void {
    if (this.newTodoTitle.trim() && this.newTodoDescription.trim()) {
      const newTodo: Todo = {
        id: this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
        title: this.newTodoTitle.trim(),
        description: this.newTodoDescription.trim()
      };
      
      this.todos.push(newTodo);
      
      // Clear the form
      this.newTodoTitle = '';
      this.newTodoDescription = '';
    }
  }

  deleteTodo(id: number, isDone: boolean = false): void {
    if (isDone) {
      this.doneTodos = this.doneTodos.filter(todo => todo.id !== id);
    } else {
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }

  startEdit(todo: Todo): void {
    this.editingTodoId = todo.id;
    this.editTodoTitle = todo.title;
    this.editTodoDescription = todo.description;
  }

  saveEdit(id: number): void {
    if (this.editTodoTitle.trim() && this.editTodoDescription.trim()) {
      const todoIndex = this.todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        this.todos[todoIndex].title = this.editTodoTitle.trim();
        this.todos[todoIndex].description = this.editTodoDescription.trim();
      }
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingTodoId = null;
    this.editTodoTitle = '';
    this.editTodoDescription = '';
  }

  isEditing(id: number): boolean {
    return this.editingTodoId === id;
  }

  drop(event: CdkDragDrop<Todo[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Cancel edit mode if moving a todo
      this.cancelEdit();
    }
  }
}
