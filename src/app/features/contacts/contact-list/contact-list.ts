import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Contact } from '../../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
  standalone: true,
})
export class ContactList implements OnChanges {
  @Input() contacts: Contact[] = [];
  @Input() selectedContact: Contact | null = null;

  @Output() contactSelected = new EventEmitter<Contact>();
  @Output() addContactClicked = new EventEmitter<void>();

  groupedContacts: { letter: string; contacts: Contact[] }[] = [];

  ngOnChanges() {
    this.sortContactsAlphabetically();
    this.groupedContacts = this.groupContactsByLetter();
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
    this.contactSelected.emit(contact);
  }

  openAddModal() {
    this.addContactClicked.emit();
  }

  getInitials(contact: Contact): string {
    if (!contact || !contact.firstname) return '';
    
    const nameParts = contact.firstname.trim().split(' ');
    
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    const firstInitial = nameParts[0].charAt(0);
    const lastInitial = nameParts[nameParts.length - 1].charAt(0);
    return (firstInitial + lastInitial).toUpperCase();
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
}
