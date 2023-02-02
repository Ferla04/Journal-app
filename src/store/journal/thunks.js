import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, setActiveNote, savingNewNote, setPhotosToActiveNote, setNotes, setSaving, updateNote } from './';

const newNote = {
  title: '',
  body: '',
  date: new Date().getTime(),
  imageUrls: []
}

export const startNewNote = () => {
  return async ( dispatch, getState ) => {

    dispatch( savingNewNote() )

    const { uid } = getState().authStore

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


export const startUploadingFiles = ( files = [] ) => {
  return async ( dispatch ) => {
    dispatch( setSaving() )

    const fileUploadPromises = [] //--> Array de promesas

    for( const file of files ){
      fileUploadPromises.push( fileUpload( file ) )
    }

    const photosUrls = await Promise.all( fileUploadPromises ) // --> Resulve todas la promesas

    dispatch( setPhotosToActiveNote( photosUrls ) )

  }
}


export const startDeletingNote = () => {
  return async ( dispatch, getState ) => {

    const { uid } = getState().authStore
    const { active: { id: idNote } } = getState().journalStore

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ idNote }` )
    await deleteDoc( docRef )

    dispatch( deleteNoteById( idNote ) )
  }
}