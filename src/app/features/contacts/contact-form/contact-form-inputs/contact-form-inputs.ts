import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contact-form-inputs',
  imports: [FormsModule],
  templateUrl: './contact-form-inputs.html',
  styleUrl: './contact-form-inputs.scss',
  standalone: true,
})
export class ContactFormInputs {
  @Input() formData: Partial<Contact> = {};
  @Output() formDataChange = new EventEmitter<Partial<Contact>>();

  updateFormData() {
    this.formDataChange.emit(this.formData);
  }
}
