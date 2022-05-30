/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable arrow-body-style */
import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../appInitialState';
import { hide, show } from './loading.actions';
import { IloadingState } from './loadingState';

const initialState: IloadingState  = appInitialState.loading;
const reducer = createReducer(initialState,
  on(show,()=>{
  return {show: true};
}),
  on(hide,()=>{
  return {show:false};
}));

export function loadingReducer(state: IloadingState, action){
  return reducer(state,action);
}
