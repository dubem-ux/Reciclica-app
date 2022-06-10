/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/store/loading/appState';
import { hide, show } from 'src/store/loading/loading.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/registerState';
import { RegisterPageForm } from './form/register.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: RegisterPageForm;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<IAppState>,
    private toastController: ToastController) { }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
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
    this.store.select('register').subscribe(state =>{
     this.toggleLoading(state);
     if(state.isRegistered){
       this.router.navigate(['home']);
     }
     if(state.error){
       this.toastController.create({
         message: state.error.message,
         duration:3000,
         header: 'registration not done'
       }).then(toast => toast.present());
     }
    });
  };

  private toggleLoading(state: RegisterState){
    if(state.isRegistering){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

}
