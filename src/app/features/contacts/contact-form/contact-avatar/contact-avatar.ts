import { Component, Input } from '@angular/core';
import { Contact } from '../../../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contact-avatar',
  imports: [],
  templateUrl: './contact-avatar.html',
  styleUrl: './contact-avatar.scss',
  standalone: true,
})
export class ContactAvatar {
  @Input() contact: Partial<Contact> | null = null;
  @Input() editMode = false;

  getInitials(contact: Partial<Contact>): string {
    if (!contact || !contact.firstname) return '';
    
    const nameParts = contact.firstname.trim().split(' ');
    
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    const firstInitial = nameParts[0].charAt(0);
    const lastInitial = nameParts[nameParts.length - 1].charAt(0);
    return (firstInitial + lastInitial).toUpperCase();
  }

  getAvatarColor(contact: Partial<Contact> | null): string {
    if (!contact) return '#FF6B6B';
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2',
    ];
    const name = (contact.firstname || '') + (contact.lastname || '');
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }
}
