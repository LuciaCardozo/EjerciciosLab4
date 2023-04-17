import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthFireService {
  public emailUsuarioLogeado: any;
  public isLogged: any = false;
  constructor(private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => this.isLogged = user);//en el caso de no estar logueado devuelve un null
  }

  //LOGIN
  async onLogin(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error on login", error);
      throw new Error('Error on login');
      
    }
  }

  async onLoginWinthGoogle() {
    try {
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error on login", error);
      return error;
    }
  }
}
