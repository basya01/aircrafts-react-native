import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../client';
import { Corners, State, Status } from '../../models';

interface Returned {
  time: number;
  states: State[];
}

export const fetchAircrafts = createAsyncThunk(
  'todos/fetchAircrafts',
  async ({ leftTop, rightBottom }: Corners) => {
    const query = `/states/all?extended=false&lamin=${rightBottom.latitude}&lomin=${leftTop.longitude}&lamax=${leftTop.latitude}&lomax=${rightBottom.longitude}`;
    const { data } = await client.get(query);
    // const { data } = await client.get('/states/all', {
    //   params: {
    //     extended: false,
    //     lamin: leftTop.latitude,
    //     lomin: leftTop.longitude,
    //     lamax: rightBottom.latitude,
    //     lomax: rightBottom.longitude,
    //   },
    // });
    return data as Returned;
  }
);

interface AircraftsState extends Returned {
  status: Status;
}

const initialState: AircraftsState = { time: 0, states: [], status: Status.IDLE };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircrafts.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchAircrafts.fulfilled, (state, action) => {
        state.time = action.payload.time;
        state.states = action.payload.states;
        state.status = Status.SUCCEEDED;
      })
      .addCase(fetchAircrafts.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export default todosSlice.reducer;
