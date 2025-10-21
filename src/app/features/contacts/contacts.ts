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
  groupedContacts: { letter: string; contacts: Contact[] }[] = [];

  private contactService = inject(ContactService);
  private firestore = inject(Firestore);

  async ngOnInit() {
    this.contacts = await this.contactService.getAllContacts();
    this.sortContactsAlphabetically();
    this.groupedContacts = this.groupContactsByLetter();
    if (this.contacts.length > 0) {
      this.selectedContact = this.contacts[0];
    }
  }

  sortContactsAlphabetically(): void {
    this.contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
  }

  groupContactsByLetter(): { letter: string; contacts: Contact[] }[] {
    const groups: { [key: string]: Contact[] } = {};
    
    this.contacts.forEach(contact => {
      const letter = contact.firstname.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(contact);
    });
    
    return Object.keys(groups)
      .sort()
      .map(letter => ({
        letter,
        contacts: groups[letter]
      }));
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  getInitials(contact: Contact): string {
      return (contact.firstname.charAt(0) ).toUpperCase();
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

  getAvatarColor(contact: Contact): string {
    let hash = 0;
    const idString = String(contact.id);
    
    for (let i = 0; i < idString.length; i++) {
      hash = idString.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % this.colorPalette.length;
    return this.colorPalette[index];
  }

  openAddModal() {
    this.showAddModal = true;
    this.newContact = {};
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  async createContact() {
  if (!this.newContact.firstname ||  !this.newContact.email || !this.newContact.phone) {
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