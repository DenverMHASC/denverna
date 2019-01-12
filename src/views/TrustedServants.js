import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import FileCopyIcon from '@material-ui/icons/FileCopy';


const TrustedServants = (props) => {
  const style = {
    width: '100%',
    height: '600px'
  }
  return (
    <div>
      <Typography variant="h6">Trust Servants Resources</Typography>
      <div>
        <List dense={true}>
          <ListItem>
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="Area Minutes Archive" />
          </ListItem>
          <ListItem>
            <ListItemIcon><FileCopyIcon /></ListItemIcon>
            <ListItemText primary="Literature Order Form" />
          </ListItem>
        </List>
      </div>
    </div >
  )
}

export default TrustedServants
