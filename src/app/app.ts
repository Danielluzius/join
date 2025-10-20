import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private firestore = inject(Firestore);

  ngOnInit() {
    const contactsRef = collection(this.firestore, 'contacts');
    onSnapshot(contactsRef, snapshot => {
      snapshot.forEach(doc => console.log(doc.id, doc.data()));
    });
  }
}