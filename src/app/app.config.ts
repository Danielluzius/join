import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      "projectId": "join-554eb",
      "appId": "1:949596014477:web:7c0328626b1faaf4fadfc4",
      "storageBucket": "join-554eb.appspot.com",
      "apiKey": "AIzaSyDFn8HmBoR5x0S2UnGjaGzxfoxy_Pd5BoA",
      "authDomain": "join-554eb.firebaseapp.com",
      "messagingSenderId": "949596014477",
      "measurementId": "G-1DYD7G0MD3"
    })),
    provideFirestore(() => getFirestore())
  ]
};
