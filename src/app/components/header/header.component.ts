import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() searchTerm = '';

  @Output() readonly searchTermChange = new EventEmitter<string>();

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchTermChange.emit(target?.value ?? '');
  }
}