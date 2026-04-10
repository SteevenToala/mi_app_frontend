import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private readonly products: CatalogProduct[] = [
    {
      id: 1,
      name: 'Spray Botella Rosa',
      category: 'Cuidado personal',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1617537230936-bb8c9327e84f?w=900&q=80',
      description: 'Botella minimalista para cuidado personal con estética limpia y funcional.',
      alt: 'Botella de spray rosa y blanca sobre fondo neutro',
    },
    {
      id: 2,
      name: 'Set de Té Cerámica',
      category: 'Hogar',
      price: 45,
      image: 'https://images.unsplash.com/photo-1626897885636-dd68020cc52a?w=900&q=80',
      description: 'Juego de té elegante con una paleta sobria para una presentación cuidada.',
      alt: 'Tetera de cerámica blanca con taza sobre fondo claro',
    },
    {
      id: 3,
      name: 'Botella Cosmética',
      category: 'Belleza',
      price: 32.5,
      image: 'https://images.unsplash.com/photo-1626897844971-aef92643f056?w=900&q=80',
      description: 'Envase premium para productos de belleza con diseño simple y reconocible.',
      alt: 'Botella cosmética blanca y marrón con etiqueta elegante',
    },
    {
      id: 4,
      name: 'Gafas Minimalistas',
      category: 'Accesorios',
      price: 89,
      image: 'https://images.unsplash.com/photo-1711564354334-ee51baa830c2?w=900&q=80',
      description: 'Montura delgada y contemporánea para una lectura rápida de producto.',
      alt: 'Par de gafas con montura delgada sobre mesa blanca',
    },
    {
      id: 5,
      name: 'Perfume Luxury',
      category: 'Fragancias',
      price: 125,
      image: 'https://images.unsplash.com/photo-1666621630026-862eea07236c?w=900&q=80',
      description: 'Fragancia exclusiva en botella de vidrio con apariencia sofisticada.',
      alt: 'Botella de perfume de vidrio transparente sobre fondo claro',
    },
    {
      id: 6,
      name: 'Gafas Reading',
      category: 'Accesorios',
      price: 65,
      image: 'https://images.unsplash.com/photo-1711564354293-30760984899e?w=900&q=80',
      description: 'Línea de accesorios con enfoque en comodidad, contraste y lectura rápida.',
      alt: 'Gafas de lectura sobre papel blanco con sombras suaves',
    },
  ];

  private readonly contacts: ContactCard[] = [
    {
      id: 1,
      name: 'Ana López',
      role: 'Diseño UI/UX',
      email: 'ana.lopez@ape2.dev',
      phone: '+34 600 123 456',
      schedule: 'Lun a vie, 09:00 - 17:00',
    },
    {
      id: 2,
      name: 'Carlos Pérez',
      role: 'Frontend',
      email: 'carlos.perez@ape2.dev',
      phone: '+34 600 222 333',
      schedule: 'Lun a jue, 10:00 - 18:00',
    },
    {
      id: 3,
      name: 'María Torres',
      role: 'Soporte y pruebas',
      email: 'maria.torres@ape2.dev',
      phone: '+34 600 987 654',
      schedule: 'Lun a vie, 08:00 - 15:00',
    },
  ];

  getProducts(): CatalogProduct[] {
    return [...this.products];
  }

  getContacts(): ContactCard[] {
    return [...this.contacts];
  }
}