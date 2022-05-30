import { IloginState } from '../login/loginState';
import { IloadingState } from './loadingState';

export interface IAppState{
  loading: IloadingState;
  login: IloginState;
}
