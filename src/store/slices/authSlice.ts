import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  confirmationCode: string;
  organization: string;


 
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
setCredientials: (
  state,
  action: PayloadAction<{
    user: User | null;
    accessToken?: string | null; // optional
    token?: string | null;       // optional (alias)
    role: string | null;
  }>
) => {
  state.user = action.payload.user;

  // Prefer accessToken, but fallback to token alias
  state.token = action.payload.accessToken ?? action.payload.token ?? null;

  state.role = action.payload.role
}
,
    clearCredientials:(state)=>{
      state.user=null
      state.token=null
      state.role=null
    }
  }
})
export const {setCredientials,clearCredientials}=authSlice.actions
export default authSlice.reducer