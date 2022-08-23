import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'

export const loadNotes = async ( uid = '') => {
  if( !uid ) throw new Error('El UID de usuario no existe')

  const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` )
  const docs = await getDocs( collectionRef )
  // Los docs traer la referencia a la nota mas no la info
  // Para conseguir la info está la func data() que esta en cada referencia

  const notes = []
  docs.forEach( doc =>{
    notes.push({ id: doc.id, ...doc.data() })
  })

  return notes
}
