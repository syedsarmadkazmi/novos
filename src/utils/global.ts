import {Platform} from 'react-native';
import {EPlatform} from '../types';

export const IS_IOS = Platform.OS === EPlatform.IOS ? true : false;

export const calcPercent = (num: number, total: number): number => {
  return Math.round((num / total) * 100);
};
