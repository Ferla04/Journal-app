import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from './';

export const startNewNote = () => {
  return async ( dispatch, getState ) => {

    dispatch( savingNewNote() )

    const { uid } = getState().authStore
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
    await setDoc( newDoc, newNote )

    newNote.id = newDoc.id

    dispatch( addNewEmptyNote( newNote ) )
    dispatch( setActiveNote( newNote ) )


  } 
}


export const startLoadingNotes = () => {
  return async ( dispatch, getState ) => {

    const { uid } = getState().authStore
    const notes = await loadNotes( uid )
    dispatch( setNotes( notes ) )
  } 
}


export const startSaveNote = () => {
  return async ( dispatch, getState ) => {

    dispatch( setSaving() )

    const { uid } = getState().authStore
    const { active:note } = getState().journalStore

    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
    await setDoc( docRef, noteToFireStore, { merge: true } )
                              //EL MERGE nos ayuda a mantener los campos que estan 
                              //en la tabla que modificamos aunque no se envien

    dispatch( updateNote( note ) )

  }
}