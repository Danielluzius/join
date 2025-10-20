import { Routes } from '@angular/router';
import { Contacts } from './features/contacts/contacts';

export const routes: Routes = [
  {
    path: 'contacts',
    component: Contacts
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  }
];