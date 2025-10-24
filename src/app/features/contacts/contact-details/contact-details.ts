import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Contact } from '../../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
  standalone: true,
})
export class ContactDetails {
  @Input() selectedContact: Contact | null = null;

  @Output() editClicked = new EventEmitter<Contact>();
  @Output() deleteClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();

  showMobileOptionsOverlay = false;
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 600) {
      this.showMobileOptionsOverlay = false;
    }
  }

  toggleMobileOptions() {
    this.showMobileOptionsOverlay = !this.showMobileOptionsOverlay;
  }

  onEdit() {
    this.showMobileOptionsOverlay = false;
    if (this.selectedContact) {
      this.editClicked.emit(this.selectedContact);
    }
  }

  onDelete() {
    this.showMobileOptionsOverlay = false;
    this.deleteClicked.emit();
  }

  onBack() {
    this.backClicked.emit();
  }

  getInitials(contact: Contact): string {
    return contact.firstname.charAt(0).toUpperCase();
  }

  colorPalette = [
    '#FF7A00',
    '#9327FF',
    '#6E52FF',
    '#FC71FF',
    '#FFBB2B',
    '#1FD7C1',
    '#462F8A',
    '#FF4646',
    '#00BEE8',
    '#FF5EB3',
    '#FF745E',
    '#FFA35E',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
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
