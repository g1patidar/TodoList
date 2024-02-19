import { createSlice } from "@reduxjs/toolkit";

const initialState = { task: [] };

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addtask: (state, action) => {
      state.task.push({
        id: Date.now(),
        work: action.payload,
        status: "Not start",
      })
    },
    deletetasklist: (state, action) => {

      state.task = state.task.filter((key) => key.id !== action.payload)
    },
    
    updatetaskstatus: (state, action) => {
      for (var i = 0; i < state.task.length; i++) {
        if (action.payload.myid === state.task[i].id) {
          state.task[i].status = action.payload.status;
        }
      }
    },
    editworktaskintodolist: (state, action) => {
      
      for (var i = 0; i < state.task.length; i++) {
        if (action.payload.editworktaskbyid === state.task[i].id) {
          state.task[i].work = action.payload.editworktask;
          alert("edit successful");
        }
      }

    }
  }
})

export const { addtask, deletetasklist, updatetaskstatus, editworktaskintodolist } = TodoSlice.actions;
export default TodoSlice.reducer;