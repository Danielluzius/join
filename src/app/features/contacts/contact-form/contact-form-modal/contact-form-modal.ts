import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

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

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showModal) {
      this.onClose();
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent) {
    this.onClose();
  }

  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }
}