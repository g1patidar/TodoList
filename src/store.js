import {  configureStore } from "@reduxjs/toolkit";
import todoreducer from "./todoSlice"
const store= configureStore({

  reducer:{
    todo:todoreducer
  }
})

export default store;