import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../core/services/db-contact-service';
import { ContactHelper, Contact } from '../../core/interfaces/db-contact-interface';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  standalone: true,
  imports: [FormsModule]

})
export class Contacts implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  showAddModal = false;
  newContact: Partial<Contact> = {};
  errorMessage = '';

  private contactService = inject(ContactService);
  private firestore = inject(Firestore);

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

  openAddModal() {
    this.showAddModal = true;
    this.newContact = {};
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  async createContact() {
  if (!this.newContact.firstname || !this.newContact.lastname || !this.newContact.email || !this.newContact.phone) {
    this.errorMessage = 'All Inputs are required.';
    return;
  }
  this.errorMessage = '';
  const contactsRef = collection(this.firestore, 'contacts');
  const docRef = await addDoc(contactsRef, this.newContact);
  const contact: Contact = { id: docRef.id, ...this.newContact as Contact };
  this.contacts.push(contact);
  this.selectedContact = contact;
  this.closeAddModal();
}
}