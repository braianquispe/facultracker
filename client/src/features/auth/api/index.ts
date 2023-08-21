import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth, User, UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/auth';
import { RootState } from '../../../store';
import { LoadingState } from '../../../store/types';

interface AuthState {
  loading: LoadingState;
  auth: Auth;
  user?: User;
}

interface Credentials { email: string; password: string }



const initialState: AuthState = { auth: auth, loading: 'idle' };
export const signIn = createAsyncThunk<UserCredential, Credentials, { state: RootState }>(
  'auth/signin',
  async ({ email, password }, { getState }) => {
    const { auth: { auth } } = getState();
    return await signInWithEmailAndPassword(auth, email, password);
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state) => {
      state.loading = 'pending';
    }),
    builder.addCase(signIn.fulfilled, (state, action) => {
      try {
        if (!action.payload) {
          throw new Error();
        }
        state.loading = 'succeeded'
        state.user = action.payload.user;
      } catch (err) {
        state.loading = 'failed';
      }
    }),
    builder.addCase(signIn.rejected, (state) => {
      state.loading = 'failed';
    })
  },
});

export default authSlice.reducer;
