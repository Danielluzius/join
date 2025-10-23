import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../core/services/db-contact-service';
import { ContactHelper, Contact } from '../../core/interfaces/db-contact-interface';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ContactList } from './contact-list/contact-list';
import { ContactDetails } from './contact-details/contact-details';
import { ContactForm } from './contact-form/contact-form';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  standalone: true,
  imports: [FormsModule, ContactList, ContactDetails, ContactForm],
})
export class Contacts implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  showAddModal = false;
  showDeleteModal = false;
  newContact: Partial<Contact> = {};
  errorMessage = '';

  private contactService = inject(ContactService);
  private firestore = inject(Firestore);

  editMode = false;

  async ngOnInit() {
    this.contacts = await this.contactService.getAllContacts();
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  deselectContact() {
    this.selectedContact = null;
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
    this.errorMessage = '';
  }

  async handleCreateContact(contactData: Partial<Contact>) {
    if (!contactData.firstname || !contactData.email || !contactData.phone) {
      this.errorMessage = 'All Inputs are required.';
      return;
    }
    this.errorMessage = '';
    const contactsRef = collection(this.firestore, 'contacts');
    const docRef = await addDoc(contactsRef, contactData);
    const contact: Contact = { id: docRef.id, ...(contactData as Contact) };
    this.contacts.push(contact);
    this.selectedContact = contact;
    await this.reloadContacts();
    this.closeAddModal();
  }

  async handleSaveContact(contactData: Partial<Contact>) {
    if (!contactData.firstname || !contactData.email || !contactData.phone) {
      this.errorMessage = 'All Inputs are required.';
      return;
    }
    this.errorMessage = '';
    if (contactData.id) {
      const contactRef = doc(this.firestore, 'contacts', contactData.id);
      await updateDoc(contactRef, {
        firstname: contactData.firstname,
        email: contactData.email,
        phone: contactData.phone,
        lastname: contactData.lastname ?? '',
      });
      const idx = this.contacts.findIndex((c) => c.id === contactData.id);
      if (idx > -1) {
        this.contacts[idx] = { ...contactData } as Contact;
        this.selectedContact = this.contacts[idx];
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
    if (this.selectedContact?.id === contact.id) {
      this.selectedContact = null;
    }
  }

  async reloadContacts() {
    this.contacts = await this.contactService.getAllContacts();
  }

  openDeleteModalFromEdit() {
    this.closeAddModal();
    this.openDeleteModal();
  }
}
