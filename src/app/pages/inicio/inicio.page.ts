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
  readonly products = this.mockDataService.getProducts();

  readonly categories = ['Todos', ...new Set(this.products.map((product) => product.category))];

  searchTerm = '';

  selectedCategory = 'Todos';

  selectedProduct: CatalogProduct = this.products[0];

  constructor(private readonly mockDataService: MockDataService) {}

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
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }
}