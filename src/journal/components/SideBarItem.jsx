import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

  const dispatch = useDispatch()

  const onClickNote = () => {
    dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
  }


  return (
    <ListItem disablePadding>
      <ListItemButton onClick={ onClickNote }>
        <ListItemIcon>
          <TurnedInNot/>
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={ title } className='barItem' />
          <ListItemText secondary={ body } className='barItem'/>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
