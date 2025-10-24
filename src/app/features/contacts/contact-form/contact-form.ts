import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Contact } from '../../../core/interfaces/db-contact-interface';
import { ContactAvatar } from './contact-avatar/contact-avatar';
import { ContactFormInputs } from './contact-form-inputs/contact-form-inputs';
import { ContactFormModal } from './contact-form-modal/contact-form-modal';

@Component({
  selector: 'app-contact-form',
  imports: [ContactAvatar, ContactFormInputs, ContactFormModal],
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
}
