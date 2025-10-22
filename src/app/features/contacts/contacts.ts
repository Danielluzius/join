import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../core/services/db-contact-service';
import { ContactHelper, Contact } from '../../core/interfaces/db-contact-interface';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  standalone: true,
  imports: [FormsModule],
})
export class Contacts implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  showAddModal = false;
  showDeleteModal = false;
  newContact: Partial<Contact> = {};
  errorMessage = '';
  groupedContacts: { letter: string; contacts: Contact[] }[] = [];

  private contactService = inject(ContactService);
  private firestore = inject(Firestore);

  editMode = false;

  async ngOnInit() {
    this.contacts = await this.contactService.getAllContacts();
    this.sortContactsAlphabetically();
    this.groupedContacts = this.groupContactsByLetter();
    // Kein Kontakt wird initial ausgewählt
  }

  sortContactsAlphabetically(): void {
    this.contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
  }

  groupContactsByLetter(): { letter: string; contacts: Contact[] }[] {
    const groups: { [key: string]: Contact[] } = {};

    this.contacts.forEach((contact) => {
      const letter = contact.firstname.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(contact);
    });

    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        contacts: groups[letter],
      }));
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  getInitials(contact: Contact): string {
    return contact.firstname.charAt(0).toUpperCase();
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

  openAddModal(editContact?: Contact) {
    this.showAddModal = true;
    this.errorMessage = '';
    if (editContact) {
      this.editMode = true;
      this.newContact = { ...editContact };
    } else {
      this.editMode = false;
      this.newContact = {};
    }
  }

  closeAddModal() {
    this.showAddModal = false;
    this.editMode = false;
    this.newContact = {};
  }

  async createContact() {
    if (!this.newContact.firstname || !this.newContact.email || !this.newContact.phone) {
      this.errorMessage = 'All Inputs are required.';
      return;
    }
    this.errorMessage = '';
    const contactsRef = collection(this.firestore, 'contacts');
    const docRef = await addDoc(contactsRef, this.newContact);
    const contact: Contact = { id: docRef.id, ...(this.newContact as Contact) };
    this.contacts.push(contact);
    this.selectedContact = contact;
    await this.reloadContacts();
    this.closeAddModal();
  }

  async saveChanges() {
    if (!this.newContact.firstname || !this.newContact.email || !this.newContact.phone) {
      this.errorMessage = 'All Inputs are required.';
      return;
    }
    this.errorMessage = '';
    if (this.newContact.id) {
      const contactRef = doc(this.firestore, 'contacts', this.newContact.id);
      await updateDoc(contactRef, {
        firstname: this.newContact.firstname,
        email: this.newContact.email,
        phone: this.newContact.phone,
        lastname: this.newContact.lastname ?? '',
      });
      const idx = this.contacts.findIndex((c) => c.id === this.newContact.id);
      if (idx > -1) {
        this.contacts[idx] = { ...this.newContact } as Contact;
        this.selectedContact = this.contacts[idx];
        this.sortContactsAlphabetically();
        this.groupedContacts = this.groupContactsByLetter();
      }
      await this.reloadContacts();
      this.closeAddModal();
    }
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  async confirmDelete() {
    if (this.selectedContact) {
      await this.deleteContact(this.selectedContact);
      this.closeDeleteModal();
    }
  }

  async deleteContact(contact: Contact) {
    if (!contact.id) return;
    const contactRef = doc(this.firestore, 'contacts', contact.id);
    await deleteDoc(contactRef);
    await this.reloadContacts();
    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.groupedContacts = this.groupContactsByLetter();
    if (this.selectedContact?.id === contact.id) {
      this.selectedContact = null;
    }
  }

  async reloadContacts() {
    this.contacts = await this.contactService.getAllContacts();
    this.sortContactsAlphabetically();
    this.groupedContacts = this.groupContactsByLetter();
  }
}
