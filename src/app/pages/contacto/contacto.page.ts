import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ContactCard, MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, IonContent, HeaderComponent, FooterComponent],
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {
  readonly contacts: ContactCard[] = this.mockDataService.getContacts();

  constructor(private readonly mockDataService: MockDataService) {}
}