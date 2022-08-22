import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null
    // active: {
    //   id: 'abc',
    //   title: '',
    //   body: '',
    //   date: 45646441,
    //   imageUrls: []
    // }
  },
  reducers: {
    addNewEmptyNote: ( state, action ) => {

    },
    setActiveNote: ( state, action ) => {

    },
    setNotes: ( state, action ) => {
      
    },
    setSaving: ( state, action ) => {
      
    },
    updateNote: ( state, action ) => {
      
    },
    deleteNoteById: ( state, action ) => {
      
    }
  }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, 
  setSaving, updateNote, deleteNoteById } = journalSlice.actions;