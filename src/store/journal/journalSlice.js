import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
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
    savingNewNote: ( state ) => {
      state.isSaving = true
    },
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload )
      state.isSaving = false
    },
    setActiveNote: ( state, action ) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload
    },
    setSaving: ( state, action ) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: ( state, { payload } ) => {
      state.isSaving = false
      state.notes = state.notes.map( note => {

        if( note.id === payload.id ) return payload
        return note
      })
      
      state.messageSaved = `${ payload.title }, actualizada correctamente`
    },
    deleteNoteById: ( state, action ) => {
      
    }
  }
});


// Action creators are generated for each case reducer function
export const { 
  addNewEmptyNote, 
  deleteNoteById, 
  savingNewNote, 
  setActiveNote, 
  setNotes, 
  setSaving, 
  updateNote, 
} = journalSlice.actions;