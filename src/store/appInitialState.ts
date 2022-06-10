import { IAppState } from './loading/appState';


export const appInitialState: IAppState = {
  loading:{
    show: false
  },
  login:{
    error: null,
    isRecoveringPassword: false,
    isRecoveredPassword: false,
    isLoggedIn: false,
    isLoggingIn: false
  },
  register:{
    error: null,
    isRegistering: false,
    isRegistered:false
  }
};
