/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { IAppState } from 'src/store/loading/appState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, recoverPassword} from 'src/store/login/login.actions';
import { IloginState } from 'src/store/login/loginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {
  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private store: Store<IAppState>, private toastController: ToastController,
    ) { }
    // private auth: AuthService...... was inside the constructir

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.loginStateSubscription= this.store.select('login').subscribe( loginState=>{
      this.onIsRecoveredPassword(loginState);
      // this.onIsRecoveringPassword(loginState);
      this.onIsLoggedIn(loginState);
      this.onError(loginState);
      // this.onIsLoggingIn(loginState);
      this.toggleLoading(loginState);
    });
  };
  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  // private onIsLoggingIn(loginState: IloginState){
  //   if(loginState.isLoggingIn){
  //     const email = this.form.get('email').value;
  //     const password = this.form.get('password').value;
  //     this.auth.login(email,password).subscribe(user =>{
  //       this.store.dispatch(loginSuccess({user}));
  //     }, error =>{
  //       this.store.dispatch(loginFail({error}));
  //     });
  //   }
  // }

  private toggleLoading(loginState: IloginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  private async onError(loginState: IloginState){
    if(loginState.error){
      // this.store.dispatch(hide());
      const toaster= await this.toastController.create({
        position:'bottom',
        message:loginState.error.message,
        color: 'danger'
      });
      toaster.present();
    }
  };

  private onIsLoggedIn(loginState: IloginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['./home']);
    }
  }

  // private onIsRecoveringPassword(loginState: IloginState){
  //   if(loginState.isRecoveringPassword){
  //     // this.store.dispatch(show());
  //     this.auth.recoverEmailPassword(this.form.get('email').value).subscribe(()=>{
  //       this.store.dispatch(recoverPasswordSuccess());
  //     }, error => {this.store.dispatch(recoverPasswordFail({error}));});
  //   }
  // };
  private async onIsRecoveredPassword(loginState: IloginState){
    if (loginState.isRecoveredPassword){
      // this.store.dispatch(hide());
      const toaster= await this.toastController.create({
        position:'bottom',
        message:'recovery email sent',
        color: 'primary'
      });
      toaster.present();
    }
  };

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword({email: this.form.get('email').value}));
    // this.store.dispatch(show());
    // setTimeout(()=>{
    //   this.store.dispatch(hide());
    // },1000);
  }



  login(): void{
    this.store.dispatch(login({email: this.form.get('email').value, password: this.form.get('password').value}));
  };
  register(): void{
    this.router.navigate(['./register']);
  };



}
