export interface Contact {
  id?: string;
  email: string;
  firstname: string;
  lastname?: string;
  phone: string;
}

export class ContactHelper {
  static getPhone(contact: Contact): string {
    return contact.phone;
  }

  static getEmail(contact: Contact): string {
    return contact.email;
  }

  static getFirstname(contact: Contact): string {
    return contact.firstname;
  }

  

  static getFullName(contact: Contact): string {
    return `${contact.firstname} ${contact.lastname}`;
  }

  static getAllData(contact: Contact): Contact {
    return contact;
  }
}