import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TaskItem {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  newTask = '';

  private nextId = 4;

  tasks: TaskItem[] = [
    { id: 1, title: 'Revisar wireframe de Figma', completed: true },
    { id: 2, title: 'Capturar pantalla responsiva', completed: false },
    { id: 3, title: 'Documentar flujo frontend', completed: false },
  ];

  addTask(): void {
    const title = this.newTask.trim();

    if (!title) {
      return;
    }

    this.tasks = [
      { id: this.nextId++, title, completed: false },
      ...this.tasks,
    ];
    this.newTask = '';
  }

  toggleTask(taskId: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  get pendingCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  get completedCount(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  trackById(_: number, task: TaskItem): number {
    return task.id;
  }
}