import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
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

  newTodoTitle: string = '';
  newTodoDescription: string = '';

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
}
