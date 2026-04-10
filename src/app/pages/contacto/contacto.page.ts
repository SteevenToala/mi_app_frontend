import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ContactoPage implements OnInit {
  contacts: ContactCard[] = [];

  constructor(private readonly mockDataService: MockDataService) {}

  async ngOnInit(): Promise<void> {
    await this.mockDataService.initData();
    this.contacts = this.mockDataService.getContacts();
  }
}