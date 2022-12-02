import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../config';
import axios from 'axios';

const initialState: {
  status: string;
  taskList: object[];
  error: string | undefined;
} = {
  status: 'idle',
  taskList: [],
  error: '',
};

export const fetchAllTodo: any = createAsyncThunk(
  'todo/fetchAllTodo',
  async (id: number) => {
    const apiSubDirectory: string = 'tasks';
    const url: string = `${BASE_URL}/${apiSubDirectory}/`;
    const response: any = await axios({
      method: 'GET',
      url,
      headers: {
        Userid: id,
      },
    });

    return response.data;
  },
);

export const uploadTask: any = createAsyncThunk(
  'todo/uploadTask',
  async (params: {userId: number; title: string; description: string}) => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/`;
    const response = await axios({
      method: 'POST',
      url,
      headers: {
        Userid: params.userId,
      },
      data: {
        title: params.title,
        description: params.description,
      },
    });

    return response.data;
  },
);

export const uploadUpdatedTask: any = createAsyncThunk(
  'todo/uploadUpdatedTask',
  async (params: {
    taskId: number;
    userId: number;
    title: string;
    description: string;
  }) => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/${params.taskId}/`;
    const response = await axios({
      method: 'PATCH',
      url,
      headers: {
        Userid: params.userId,
      },
      data: {
        title: params.title,
        description: params.description,
      },
    });

    return response.data;
  },
);

export const deleteTask: any = createAsyncThunk(
  'todo/deleteTask',
  async (params: {taskId: number; userId: number}) => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/${params.taskId}/`;
    await axios({
      method: 'DELETE',
      url,
      headers: {
        Userid: params.userId,
      },
    });

    return params;
  },
);

export const toggleCompletion: any = createAsyncThunk(
  'todo/toggleCompletion',
  async (params: {taskId: number; userId: number; status: boolean}) => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/${params.taskId}/`;
    const response = await axios({
      method: 'PATCH',
      url,
      headers: {
        Userid: params.userId,
      },
      data: {
        is_completed: !params.status,
      },
    });

    return response.data;
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearList: () => initialState,
    resetErrorMessage: state => {
      return {...state, error: ''};
    },
    resetStatus: state => {
      return {...state, status: 'idle'};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllTodo.pending, state => {
        state.status = 'running';
      })
      .addCase(fetchAllTodo.fulfilled, (state, action) => {
        state.taskList = action.payload;
        state.error = '';
        state.status = 'resolvedFetchAllTodo';
      })
      .addCase(fetchAllTodo.rejected, (state, action) => {
        state.error = action.error?.message;
        state.status = 'error';
      })
      .addCase(uploadTask.pending, state => {
        state.status = 'running';
      })
      .addCase(uploadTask.fulfilled, (state, action) => {
        state.taskList = [...state.taskList, action.payload];
        state.error = '';
        state.status = 'resolved';
      })
      .addCase(uploadTask.rejected, (state, action) => {
        state.error = action.error?.message;
        state.status = 'error';
      })
      .addCase(toggleCompletion.pending, state => {
        state.status = 'running';
      })
      .addCase(toggleCompletion.fulfilled, (state, action) => {
        const task: any = state.taskList.find(
          (singleTask: any) => singleTask.id === action.payload.id,
        );
        task.is_completed = action.payload.is_completed;
        state.error = '';
        state.status = 'resolvedToggle';
      })
      .addCase(toggleCompletion.rejected, (state, action) => {
        state.error = action.error?.message;
        state.status = 'toggleError';
      })
      .addCase(uploadUpdatedTask.pending, state => {
        state.status = 'running';
      })
      .addCase(uploadUpdatedTask.fulfilled, (state, action) => {
        const task: any = state.taskList.find(
          (singleTask: any) => singleTask.id === action.payload.id,
        );
        task.title = action.payload.title;
        task.description = action.payload.description;
        state.error = '';
        state.status = 'resolved';
      })
      .addCase(uploadUpdatedTask.rejected, (state, action) => {
        state.error = action.error?.message;
        state.status = 'error';
      })
      .addCase(deleteTask.pending, state => {
        state.status = 'running';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.taskList = state.taskList.filter(
          (task: any) => task.id !== action.payload.taskId,
        );
        state.error = '';
        state.status = 'resolved';
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error?.message;
        state.status = 'error';
      });
  },
});

export const {clearList, resetErrorMessage, resetStatus} = todoSlice.actions;
export default todoSlice.reducer;
