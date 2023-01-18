import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface  IComment{
  id?: number,
  textComment?: string,
  parentId?: number,
  comment: IComment[]
}

export interface Itask {
  taskTitle:     string;
  idProject:     number;
  description:   string;
  dataStart:     number;
  timeInWork:    number;
  deadLine:      number;
  priority:      string;
  files:         string;
  currentStatus: "inWork"|"notStarted"|"done";
  id:            string;
  comment:IComment[]
}

export interface ITaskState {
   task?:Itask[]
   currnetTask?:Itask;
}


const initialState ={
    task:[
  ]
}

export const fetchTask = createAsyncThunk(
    'task/fetchTask',
    async () => {
      const response = await fetch(`https://638872bdd94a7e50409bcdb5.mockapi.io/tasks`)
      return (await response.json()) 
    }
  )

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state:ITaskState,action:PayloadAction<Itask>)=>{
      state.currnetTask=action.payload;
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state:ITaskState, { payload }) => {
     //   console.log(state);
        state.task=payload;
      //  console.log(state);
    })
    builder.addCase(fetchTask.rejected, (state, action) => {
        console.log("error");
    })

  },
})


export const { setCurrentTask } = taskSlice.actions

export default taskSlice.reducer