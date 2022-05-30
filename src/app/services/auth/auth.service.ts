import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  recoverEmailPassword(email: string): Observable<void>{
    return new Observable<void>(observer =>{
      this.auth.sendPasswordResetEmail(email).then(()=>{
        observer.next();
        observer.complete();
      }).catch(error=>{
        observer.error(error);
        observer.complete();
      });
    //   setTimeout(()=>{
    //     if(email === 'error@email.com'){
    //       observer.error({message: 'Email not found'});
    //     }
    //     observer.next();
    //     observer.complete();
    //   },3000);
    });
  }

  login(email: string, password: string): Observable <User>{
    return new Observable<User>(observer =>{
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=>{
        this.auth.signInWithEmailAndPassword(email,password)
        .then((firebaseUser: firebase.default.auth.UserCredential)=>{
          observer.next({email,id: firebaseUser.user.uid});
          observer.complete();
        }).catch(error =>{
          observer.error(error);
          observer.complete();
        });
      });
    //   setTimeout(()=>{
    //     if(email === 'error@email.com'){
    //       observer.error({message: 'User Not Found'});

    //       observer.next();

    //     }else{
    //       const user = new User();
    //       user.email = email;
    //       user.id = 'userId';
    //       observer.next(user);
    //     }
    //     observer.complete();
    // },3000);
    });
  }
}
