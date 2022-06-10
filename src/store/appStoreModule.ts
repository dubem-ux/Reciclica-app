import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { registerReducers } from 'src/app/pages/register/register.reducers';
import { loadingReducer } from './loading/loading.reducers';
import { LoginEffects } from './login/login.effects';
import { loginReducer } from './login/login.reducers';
import { RegisterEffects } from './register/register.effects';

export const appStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  StoreModule.forFeature('register', registerReducers),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([
    LoginEffects,
    RegisterEffects
  ])
];
