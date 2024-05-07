import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    error: null,
    userList: [],
    userDetails: null,
}

export const fetchUsers = createAsyncThunk("get/users", async () => {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    return data.users;
});

export const fetchUserDetails = createAsyncThunk(
    "get/userdetails",
    async (userId) => { 
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();
      
      return data;
    }
)

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.userList=action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(fetchUserDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetails = action.payload; 
        })
        .addCase(fetchUserDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }

})

export default userSlice.reducer;