import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Contact } from '../../../core/interfaces/db-contact-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  standalone: true,
})
export class ContactForm implements OnChanges {
  @Input() showModal = false;
  @Input() editMode = false;
  @Input() contact: Partial<Contact> | null = null;
  @Input() errorMessage = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() createContact = new EventEmitter<Partial<Contact>>();
  @Output() saveContact = new EventEmitter<Partial<Contact>>();
  @Output() deleteFromEdit = new EventEmitter<void>();

  formData: Partial<Contact> = {};

  ngOnChanges() {
    if (this.contact) {
      this.formData = { ...this.contact };
    } else {
      this.formData = {};
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.editMode) {
      this.saveContact.emit(this.formData);
    } else {
      this.createContact.emit(this.formData);
    }
  }

  onDeleteFromEdit() {
    this.deleteFromEdit.emit();
  }

  getInitials(contact: Partial<Contact> | null): string {
    if (!contact) return '';
    const firstInitial = contact.firstname?.charAt(0) || '';
    const lastInitial = contact.lastname?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase();
  }
  
  getAvatarColor(contact: Partial<Contact> | null): string {
    if (!contact) return '#FF6B6B';
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    const name = (contact.firstname || '') + (contact.lastname || '');
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }
}
