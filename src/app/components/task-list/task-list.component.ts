import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockDataService, TaskItem } from '../../services/mock-data.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  taskForm = {
    title: '',
  };

  isTaskModalOpen = false;

  private nextId = 4;

  tasks: TaskItem[] = [];

  constructor(private readonly mockDataService: MockDataService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.mockDataService.initData();
    } catch {
      // Keep tasks section interactive with whatever data is already available.
    }
    this.tasks = this.mockDataService.getTasks();
    this.nextId = this.tasks.length ? Math.max(...this.tasks.map((task) => task.id)) + 1 : 1;
  }

  addTask(): void {
    const title = this.taskForm.title.trim();

    if (!title) {
      return;
    }

    this.tasks = [
      { id: this.nextId++, title, completed: false },
      ...this.tasks,
    ];
    this.closeTaskModal();
    this.resetTaskForm();
    this.persistTasks();
  }

  openTaskModal(): void {
    this.isTaskModalOpen = true;
  }

  closeTaskModal(): void {
    this.isTaskModalOpen = false;
  }

  cancelTaskModal(): void {
    this.closeTaskModal();
    this.resetTaskForm();
  }

  toggleTask(taskId: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    this.persistTasks();
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.persistTasks();
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

  private resetTaskForm(): void {
    this.taskForm = {
      title: '',
    };
  }

  private persistTasks(): void {
    this.mockDataService.setTasks(this.tasks);
  }
}