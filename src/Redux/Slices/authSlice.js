import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';


// Initial state
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    user: localStorage.getItem('user') || null,
    loading:  false,
    error: null,
  };

export const createAccount = createAsyncThunk('auth/register',
async(data)=>{
    try{
        console.log(data.get('name'));
        console.log(data.get('email'));

        const res = await axiosInstance.post('/teacher/create', data);


        console.log(res.data);
        if (res.data?.success) {
            toast.success(res.data?.message);
        } else {
            toast.error(res.data?.message);
        }
        return res.data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
    
})
export const loginTeacher = createAsyncThunk(
    'auth/login-teacher',
    async(data)=>{
        try{
            const res = await axiosInstance.post('/auth/login/teacher', data);
            console.log(res.data);
            if (res.data?.success) {
                toast.success(res.data?.message);
            } else {
                toast.error(res.data?.message);
            }
            return res.data;
        }catch(err){
            toast.error(err?.response?.data?.message);
        }
        
    }
)



// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('user', JSON.stringify(action?.payload?.user)) 
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'An error occurred';
      });
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

// Export actions and reducer
export const { setUser, clearUser, clearError } = authSlice.actions;
export default authSlice.reducer;
