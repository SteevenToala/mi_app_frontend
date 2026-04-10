import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CatalogProduct, MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, HeaderComponent, FooterComponent],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  products: CatalogProduct[] = this.mockDataService.getProducts();

  searchTerm = '';

  selectedCategory = 'Todos';

  selectedProduct: CatalogProduct = this.products[0];

  isDetailModalOpen = false;

  isFormModalOpen = false;

  editingProductId: number | null = null;

  formProduct: {
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    alt: string;
  } = {
    name: '',
    category: '',
    price: 0,
    image: '',
    description: '',
    alt: '',
  };

  constructor(private readonly mockDataService: MockDataService) {}

  get categories(): string[] {
    return ['Todos', ...new Set(this.products.map((product) => product.category))];
  }

  get filteredProducts(): CatalogProduct[] {
    const normalizedSearch = this.searchTerm.trim().toLowerCase();

    return this.products.filter((product) => {
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }

  selectProduct(product: CatalogProduct): void {
    this.selectedProduct = product;

    if (window.innerWidth <= 1024) {
      this.isDetailModalOpen = true;
    }
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  closeDetailModal(): void {
    this.isDetailModalOpen = false;
  }

  openFormModal(): void {
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
  }

  addOrUpdateProduct(): void {
    const name = this.formProduct.name.trim();
    const category = this.formProduct.category.trim();
    const image = this.formProduct.image.trim();
    const description = this.formProduct.description.trim();
    const alt = this.formProduct.alt.trim() || `Imagen de ${name}`;
    const price = Number(this.formProduct.price);

    if (!name || !category || !image || !description || Number.isNaN(price) || price <= 0) {
      return;
    }

    if (this.editingProductId !== null) {
      this.products = this.products.map((product) =>
        product.id === this.editingProductId
          ? { ...product, name, category, image, description, alt, price }
          : product,
      );

      if (this.selectedProduct.id === this.editingProductId) {
        const updated = this.products.find((product) => product.id === this.editingProductId);
        if (updated) {
          this.selectedProduct = updated;
        }
      }
    } else {
      const nextId = this.products.length
        ? Math.max(...this.products.map((product) => product.id)) + 1
        : 1;

      const newProduct: CatalogProduct = {
        id: nextId,
        name,
        category,
        image,
        description,
        alt,
        price,
      };

      this.products = [newProduct, ...this.products];
      this.selectedProduct = newProduct;
    }

    this.closeFormModal();
    this.resetForm();
  }

  startEditProduct(product: CatalogProduct, event?: Event): void {
    event?.stopPropagation();
    this.editingProductId = product.id;
    this.formProduct = {
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      alt: product.alt,
    };
    this.openFormModal();
  }

  deleteProduct(productId: number, event?: Event): void {
    event?.stopPropagation();
    this.products = this.products.filter((product) => product.id !== productId);

    if (this.selectedProduct.id === productId && this.products.length > 0) {
      this.selectedProduct = this.products[0];
    }

    if (this.selectedCategory !== 'Todos' && !this.products.some((p) => p.category === this.selectedCategory)) {
      this.selectedCategory = 'Todos';
    }

    if (this.editingProductId === productId) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.editingProductId = null;
    this.formProduct = {
      name: '',
      category: '',
      price: 0,
      image: '',
      description: '',
      alt: '',
    };
  }

  cancelFormModal(): void {
    this.closeFormModal();
    this.resetForm();
  }
}