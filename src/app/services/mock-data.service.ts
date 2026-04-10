import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface CatalogProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  alt: string;
}

export interface ContactCard {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  schedule: string;
}

export interface TaskItem {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private static readonly PRODUCTS_STORAGE_KEY = 'ape2_products_db';

  private static readonly CONTACTS_STORAGE_KEY = 'ape2_contacts_db';

  private static readonly TASKS_STORAGE_KEY = 'ape2_tasks_db';

  private products: CatalogProduct[] = [];

  private contacts: ContactCard[] = [];

  private tasks: TaskItem[] = [];

  private initialized = false;

  constructor(private readonly httpClient: HttpClient) {}

  async initData(): Promise<void> {
    if (this.initialized) {
      return;
    }

    const storedProducts = this.getFromStorage<CatalogProduct[]>(MockDataService.PRODUCTS_STORAGE_KEY);
    const storedContacts = this.getFromStorage<ContactCard[]>(MockDataService.CONTACTS_STORAGE_KEY);
    const storedTasks = this.getFromStorage<TaskItem[]>(MockDataService.TASKS_STORAGE_KEY);

    if (storedProducts?.length) {
      this.products = storedProducts;
    } else {
      this.products = await this.loadJsonOrFallback<CatalogProduct[]>('assets/data/products.json', []);
      this.persistProducts(this.products);
    }

    if (storedContacts?.length) {
      this.contacts = storedContacts;
    } else {
      this.contacts = await this.loadJsonOrFallback<ContactCard[]>('assets/data/contacts.json', []);
      this.persistContacts(this.contacts);
    }

    if (storedTasks?.length) {
      this.tasks = storedTasks;
    } else {
      this.tasks = await this.loadJsonOrFallback<TaskItem[]>('assets/data/tasks.json', []);
      this.persistTasks(this.tasks);
    }

    this.initialized = true;
  }

  getProducts(): CatalogProduct[] {
    return [...this.products];
  }

  setProducts(products: CatalogProduct[]): void {
    this.products = [...products];
    this.persistProducts(this.products);
  }

  getContacts(): ContactCard[] {
    return [...this.contacts];
  }

  getTasks(): TaskItem[] {
    return [...this.tasks];
  }

  setTasks(tasks: TaskItem[]): void {
    this.tasks = [...tasks];
    this.persistTasks(this.tasks);
  }

  private async loadJson<T>(path: string): Promise<T> {
    return firstValueFrom(this.httpClient.get<T>(path));
  }

  private async loadJsonOrFallback<T>(path: string, fallback: T): Promise<T> {
    try {
      return await this.loadJson<T>(path);
    } catch {
      return fallback;
    }
  }

  private getFromStorage<T>(key: string): T | null {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  private persistProducts(products: CatalogProduct[]): void {
    localStorage.setItem(MockDataService.PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }

  private persistContacts(contacts: ContactCard[]): void {
    localStorage.setItem(MockDataService.CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  }

  private persistTasks(tasks: TaskItem[]): void {
    localStorage.setItem(MockDataService.TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }
}