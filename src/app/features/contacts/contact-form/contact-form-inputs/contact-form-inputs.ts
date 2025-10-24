import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Contact } from '../../../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contact-form-inputs',
  imports: [FormsModule],
  templateUrl: './contact-form-inputs.html',
  styleUrl: './contact-form-inputs.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactFormInputs),
      multi: true,
    },
  ],
})
export class ContactFormInputs implements ControlValueAccessor {
  formData: Partial<Contact> = {};

  private onChange: (value: Partial<Contact>) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Partial<Contact>): void {
    if (value) {
      this.formData = { ...value };
    } else {
      this.formData = {};
    }
  }

  registerOnChange(fn: (value: Partial<Contact>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateFormData() {
    this.onChange(this.formData);
    this.onTouched();
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9+\s\-()]/g, '');
    this.formData.phone = input.value;
    this.updateFormData();
  }
}
