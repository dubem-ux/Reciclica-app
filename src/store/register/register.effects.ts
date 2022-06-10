/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { register, registerFail, registerSuccess } from './register.actions';
import { UserRegister } from 'src/app/model/user/userRegister';


@Injectable()

export class RegisterEffects{
constructor( private actions$: Actions, private authService: AuthService){}

// recoverPassword$ = createEffect(()=> this.actions$.pipe(
//   ofType(recoverPassword),
//   switchMap((payload: {email: string})=> this.authService.recoverEmailPassword(payload.email).pipe(
//   map(()=> recoverPasswordSuccess()),
//   catchError(error => of(recoverPasswordFail({error})))
//   ))
// ));

register$ = createEffect(()=> this.actions$.pipe(
  ofType(register),
  switchMap((payload: {userRegister: UserRegister})=>
  this.authService.register(payload.userRegister).pipe(
    map(()=> registerSuccess()),
    catchError(error => of(registerFail({error})))
  ))
));
}
