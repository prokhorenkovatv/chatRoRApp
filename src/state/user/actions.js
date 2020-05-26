import { createAction } from 'redux-act';

export const saveToken = createAction('Token has been saved');
export const saveUser = createAction('User has been saved');
export const signout = createAction('User has signed out');
