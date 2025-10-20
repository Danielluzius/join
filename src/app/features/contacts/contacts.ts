import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../core/services/db-contact-service';
import { ContactHelper, Contact } from '../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  standalone: true
})
export class Contacts implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;

  private contactService = inject(ContactService);

  async ngOnInit() {
    this.contacts = await this.contactService.getAllContacts();
    if (this.contacts.length > 0) {
      this.selectedContact = this.contacts[0];
    }
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  getInitials(contact: Contact): string {
    return (
      (contact.firstname?.charAt(0) || '') +
      (contact.lastname?.charAt(0) || '')
    ).toUpperCase();
  }
}