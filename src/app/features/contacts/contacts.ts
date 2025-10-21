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

  colorPalette = [
    '#FF7A00', // Orange
    '#9327FF', // Purple
    '#6E52FF', // Blue
    '#FC71FF', // Pink
    '#FFBB2B', // Yellow
    '#1FD7C1', // Teal
    '#462F8A', // Dark Purple
    '#FF4646', // Red
    '#00BEE8', // Light Blue
    '#FF5EB3', // Light Pink
    '#FF745E', // Coral
    '#FFA35E', // Light Orange
    '#FFC701', // Bright Yellow
    '#0038FF', // Vivid Blue
    '#C3FF2B', // Lime Green
    '#FFE62B', // Bright Yellow
  ];
}