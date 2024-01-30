import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {RootState} from '../store';

const healthSlice = createSlice({
  name: 'health',
  initialState: {
    steps: 0,
    active: false,
  },

  reducers: {
    /** locale reducers */
    updateSteps: (state, action) => {
      state.steps = action.payload;
    },

    updateStatus: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const {updateSteps, updateStatus} = healthSlice.actions;

export const healthReducer = healthSlice.reducer;

export const useHealthSelector = () => {
  return useSelector((state: RootState) => state.health);
};
