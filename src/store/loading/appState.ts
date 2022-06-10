import { IloginState } from '../login/loginState';
import { RegisterState } from '../register/registerState';
import { IloadingState } from './loadingState';

export interface IAppState{
  loading: IloadingState;
  login: IloginState;
  register: RegisterState;
}
