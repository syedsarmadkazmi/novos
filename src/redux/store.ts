import {configureStore} from '@reduxjs/toolkit';

import {healthReducer} from './slices';

export const store = configureStore({
  reducer: {
    health: healthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
