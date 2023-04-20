import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Base_Url } from '../../utils/baseUrl'

const initialState = {
  data: {},
  // isSuccess: false,
  // loading: false,
  userName: '',
}

export const LoginAsyncThunk = createAsyncThunk(
  'Login/LoginAsyncThunk',
  async (arg , { rejectWithValue }) => {
    // console.log('arg', arg)
    const body = {
        name: arg.userName,
        password: arg.password,
    }
    // console.log('body', body)
    try {
      const fetchedData = await axios(
        `${Base_Url}/api/v1/admin_login`,
        {
          method: "post",
          data: body,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      return fetchedData;
    } catch (err) {
      let error = err
      console.log('error.response.data', error.response.data)

      return rejectWithValue(
        error && error.response && error.response.data && error.response.data,
      )
    }
  },
)

export const LoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder.addCase(LoginAsyncThunk.pending, (state, action) => {
      console.log('fetching Data...')
    })
    builder.addCase(LoginAsyncThunk.fulfilled, (state, action) => {
      // console.log('fetched Data Successfully', action.payload)
      state.data = action
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.message &&
        action.payload.data.message === 'Admin login successful'
      ) {
        console.log("login",action.payload.data)
        // if (action.payload.data.role === '[ROLE_ADMIN]') {
        //   toast.success('Successfully Logged In as admin', {
        //     position: 'top-center',
        //     autoClose: 5000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'light',
        //   })
        //   sessionStorage.setItem('login', 'admin')
        // } else if (action.payload.data.role === '[ROLE_SUPER_ADMIN]') {
        //   toast.success('Successfully Logged In as Super Admin', {
        //     position: 'top-center',
        //     autoClose: 5000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'light',
        //   })
        //   sessionStorage.setItem('login', 'superAdmin')
        // }
        toast.success('Successfully Logged In as admin', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        sessionStorage.setItem('login', 'admin')
        sessionStorage.setItem('token', action.payload.data.accessToken)
        window.location.reload()
      }
    })
    builder.addCase(LoginAsyncThunk.rejected, (state, action) => {
      toast.error('Invalid credentials', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      // console.log('rejected',action)
      state.data = action
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = LoginSlice.actions

export default LoginSlice
