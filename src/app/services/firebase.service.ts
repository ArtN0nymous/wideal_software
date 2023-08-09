import { Injectable } from '@angular/core';
import { Firestore,collection,collectionData } from '@angular/fire/firestore';
import { AuthModule } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore: Firestore, private auth: AuthModule) {}

  getNotes(){
    const colRef = collection(this.firestore,'notes');
    return collectionData(colRef);
  }
}
