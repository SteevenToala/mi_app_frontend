import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() searchTerm = '';

  @Output() readonly searchTermChange = new EventEmitter<string>();

  readonly navItems = [
    { label: 'Inicio', path: '/inicio' },
    { label: 'Contacto', path: '/contacto' },
  ];

  constructor(private readonly router: Router) {}

  get showSearch(): boolean {
    return this.router.url.startsWith('/inicio');
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchTermChange.emit(target?.value ?? '');
  }
}