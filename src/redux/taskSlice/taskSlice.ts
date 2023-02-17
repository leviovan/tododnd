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
  dataStart:     string;
  timeInWork:    string;
  deadLine:      string;
  priority:      string;
  files:         string;
  currentStatus: "inWork"|"notStarted"|"done";
  id:            string;
  comment?:IComment[]
}

export interface ITaskState {
   task?:Itask[]
   currnetTask?:Itask;
}


const initialState ={
    task:[]
//   ],
//   currnetTask:{
//     taskTitle:     "string",
//     idProject:     1,
//     description:   "string",
//     dataStart:     "string",
//     timeInWork:    "string",
//     deadLine:      "string",
//     priority:      "string",
//     files:         "string",
//     currentStatus: "notStarted",
//     id:            "string",
//     comment:{}
// }
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
  reducers:{
    setCurrentTask: (state:ITaskState,action:PayloadAction<Itask>)=>{
      state.currnetTask=action.payload;
  
    },
    changeCurrentStatus: (state:ITaskState,action:PayloadAction<"inWork" | "notStarted" | "done">)=>{
      state.currnetTask ? state.currnetTask.currentStatus=action.payload:console.log("error");
      //@ts-ignore
      state.task=[...state.task?.filter((item)=>item.id !== state.currnetTask?.id ),state.currnetTask]
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state:ITaskState, { payload }) => {
        state.task=payload;

    })
    builder.addCase(fetchTask.rejected, (state, action) => {
        console.log("error");
    })

  },
})


export const { setCurrentTask, changeCurrentStatus } = taskSlice.actions

export default taskSlice.reducer