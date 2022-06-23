/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable arrow-body-style */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/store/loading/appState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login } from 'src/store/login/login.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/registerState';
import { RegisterPageForm } from './form/register.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm: RegisterPageForm;
  registerPageSubscription: Subscription;

  constructor( private formBuilder: FormBuilder, private store: Store<IAppState>,
    private toastController: ToastController) {
      // private router: Router,
     }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }

  ngOnDestroy() {
    this.registerPageSubscription.unsubscribe();
  }

  register(): void{
    this.registerForm.getForm().markAllAsTouched();
    if(this.registerForm.getForm().valid){
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}));
      console.log('registered');
    }

  }

  private createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.registerPageSubscription = this.store.select('register').subscribe(state =>{
     this.toggleLoading(state);
     this.onRegistered(state);
     this.onError(state);
    });
  };
  private onRegistered(state: RegisterState){
    if(state.isRegistered){
      //  this.router.navigate(['home']);
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password
      }));
     }
  }
  private onError(state: RegisterState){
    if(state.error){
      this.toastController.create({
        message: state.error.message,
        duration:3000,
        header: 'registration not done'
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: RegisterState){
    if(state.isRegistering){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

}
