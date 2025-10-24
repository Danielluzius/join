import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-form-modal',
  imports: [],
  templateUrl: './contact-form-modal.html',
  styleUrl: './contact-form-modal.scss',
  standalone: true,
})
export class ContactFormModal {
  @Input() showModal = false;
  @Input() editMode = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}
