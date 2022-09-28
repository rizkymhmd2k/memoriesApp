import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api'


export const signinGoogle = createAsyncThunk(
    'user/signingoogle',
    async ({ accessToken, navigate }) => {
        try {
            // console.log('AccToken = ', accessToken);
            const { data } = await api.signInGoogle(accessToken);
            // redirect user to the home page
            // console.log('can you',data);
            navigate("/posts")
            return data;
        } catch (error) {
            console.log(error);
            return;
        }
    }
);

export const signupGoogle = createAsyncThunk(
  'user/signingoogle',
  async ({ accessToken, navigate }) => {
      try {
          console.log('AccToken = ', accessToken);
          const { data } = await api.signUpGoogle(accessToken);
          // redirect user to the home page
          console.log('can you',data);
          navigate("/posts")
          return data;
      } catch (error) {
          console.log(error);
          return;
      }
  }
);

export const signIn = createAsyncThunk(
  'user/signin',
  async ({ formData, navigate }) => {
    try {
      // log in the user
      console.log('FORM DATA = ', formData);
      const { data } = await api.signIn(formData);
      // redirect to the home page
      console.log('data', data);
      navigate("/posts")
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signup',
  async ({ formData, navigate }) => {
    try {
      // log in the user
      console.log('FORM DATA signup = ', formData);
      const { data } = await api.signUp(formData);
      // redirect to the home page
      navigate("/posts")
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);






const userSlice = createSlice({
    name: 'User',
    initialState: {
      authData: null,
      isSignUp: true,
      isLoading: false,
    },
    reducers: {
    //   toggleIsSignUp: (state, action) => {
    //     const data = action?.payload;
    //     if (typeof data === 'boolean') state.isSignUp = data;
    //     else state.isSignUp = !state.isSignUp;
    //   },
    //   authUser: (state, action) => {
    //     state.authData = action?.payload; //equal to return??, dont need to put.. again
    //     localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
    //   },
      deAuth: state => {
        localStorage.clear();
        state.authData = null;
      },
    },
    extraReducers: builder => {
      builder.addCase(signUp.fulfilled, (state, action) => {
        state.authData = action?.payload;
        // console.log('Setting localStorage with ', action.payload);
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      });
      builder.addCase(signIn.fulfilled, (state, action) => {
        state.authData = action?.payload;
        // console.log('Setting localStorage with ', action.payload);
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      });
    builder.addCase(signinGoogle.fulfilled, (state, action) => {
        state.authData = action.payload;
        // console.log('Setting localStorage with ', action.payload);
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      });
    },
  });





export const { toggleIsSignUp, authUser, deAuth } = userSlice.actions;
export default userSlice.reducer;
