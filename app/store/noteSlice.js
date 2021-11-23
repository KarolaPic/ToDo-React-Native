import { createSlice } from "@reduxjs/toolkit"

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: []
  },
  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload]
    },
    removeNote: (state, action) => {
      const newNotes = state.notes.filter(n => n.id !== action.payload)
      state.notes = newNotes
    },
    updateNote: (state, action) => {
      const editNote = state.notes.filter(n => n.id == action.payload)
      editNote.title = action.payload.title
      editNote.text = action.payload.text
      state.notes = [editNote]
    },
  
  }
})

export const { addNote, removeNote, updateNote } = noteSlice.actions

export default noteSlice.reducer