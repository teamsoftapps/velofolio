import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  role: ["client", "manager", "admin","editor"];
  permissions: string[];

 
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};
const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    setCredientials:(state,action:PayloadAction<{user:User|null,token:string|null,role:string|null}>)=>{
      state.user=action.payload.user
      state.token=action.payload.token
      state.role=action.payload.role
    },
    clearCredientials:(state)=>{
      state.user=null
      state.token=null
      state.role=null
    }
  }
})
export const {setCredientials,clearCredientials}=authSlice.actions
export default authSlice.reducer