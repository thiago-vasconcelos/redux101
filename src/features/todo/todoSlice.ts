import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TodoState {
  id: number;
  text: string;
  complete: boolean;
}

const initialState: TodoState[] = [
  { id: 0, text: 'Run redux app', complete: false },
  { id: 1, text: 'Insert toggle button', complete: true },
];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => [
      ...state,
      { id: Math.random(), text: action.payload, complete: false },
    ],
    toggleTodo: (state, action: PayloadAction<number>) => state.map(
      (todo) => (todo.id === action.payload
        ? { ...todo, complete: !todo.complete }
        : { ...todo }),
    ),
    removeTodo: (state, action: PayloadAction<number>) => state.filter(
      (todo) => todo.id !== action.payload,
    ),
    default: (state) => state,
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
