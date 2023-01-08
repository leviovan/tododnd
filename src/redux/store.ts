import  taskSlice  from './taskSlice/taskSlice';
import projectSlice  from './projectSlice/projectSlice';

import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
  reducer: {
    project:projectSlice,
    task:taskSlice
},
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch