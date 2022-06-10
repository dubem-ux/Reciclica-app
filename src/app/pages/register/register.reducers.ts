/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { createReducer, on } from '@ngrx/store';
import { appInitialState } from 'src/store/appInitialState';
import { register, registerFail, registerSuccess } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/registerState';
const initialState = appInitialState.register;
const reducer = createReducer(initialState,
  on(register, state =>{
    return{
      ...state,
      error: null,
      isRegistered: false,
      isRegistering: true
    };
  }),
    on(registerSuccess, state =>{
      return {
        ...state,
        isRegistered:true,
        isRegistering: false
      };
    }),
    on(registerFail, (state, action) => {
      return{
        ...state,
        error: action.error,
        isRegistered: false,
        isRegistering: false
      };
    })
  );

export function registerReducers(state: RegisterState, action){
  return reducer(state, action);
}
