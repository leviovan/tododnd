import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Iproject {
    id: number,
    title:string
}
export interface Iprojectstate {
   project?:Iproject[]
}


const initialState: Iprojectstate={
    project:[{ id: 0,
                 title:"string"}]
}

export const fetchProject = createAsyncThunk(
    'project/getProject',
    async () => {
      const response = await fetch(`https://638872bdd94a7e50409bcdb5.mockapi.io/project`)
      const data=await response.json()
        // console.log(data);
      
      return (data) 
    }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, { payload }) => {
     //   console.log(state);
        state.project=payload;
      //  console.log(state);
    })
    builder.addCase(fetchProject.rejected, (state, action) => {
        console.log("error");
        
    })
  },

})


export const { } = projectSlice.actions

export default projectSlice.reducer