import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { ContactService } from './core/services/db-contact-service';
import { ContactHelper, Contact } from './core/interfaces/db-contact-interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  contacts: Contact[] = [];

  private contactService = inject(ContactService);

  async ngOnInit() {
    this.contacts = await this.contactService.getAllContacts();


    // Beispielcode um die email des kontaktes "0" auszugeben
    if (this.contacts.length > 0) {
      console.log(ContactHelper.getEmail(this.contacts[0]));
    }



  }
}