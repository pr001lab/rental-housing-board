import {combineReducers} from 'redux';
import {appData} from './data/data';
import {appProcess} from './app/app';
import {userProcess} from './user/user';

export enum NameSpace {
  data = 'DATA',
  app = 'APP',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.app]: appProcess,
  [NameSpace.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
