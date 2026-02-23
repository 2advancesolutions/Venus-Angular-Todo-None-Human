import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
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
}
