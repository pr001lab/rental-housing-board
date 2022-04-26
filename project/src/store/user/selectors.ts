import {AuthorizationStatus} from '../../const';
import {User} from '../../types/offer';
import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus => (
  state[NameSpace.user].authorizationStatus
);
export const selectLoginLoading = (state: State): boolean => (
  state[NameSpace.user].loginLoading
);
export const selectUserData = (state: State): User | null | undefined => (
  state[NameSpace.user].userData
);
