import { Routes } from '@angular/router';
import { Summary } from './features/summary/summary';
import { AddTask } from './features/add-task/add-task';
import { Board } from './features/board/board';
import { Contacts } from './features/contacts/contacts';
import { PrivacyPolicy } from './features/privacy-policy/privacy-policy';
import { LegalNotice } from './features/legal-notice/legal-notice';

export const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'summary', component: Summary },
  { path: 'add-task', component: AddTask },
  { path: 'board', component: Board },
  { path: 'contacts', component: Contacts },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'legal-notice', component: LegalNotice },
];
