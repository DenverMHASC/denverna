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
  return (
    <div>
      <Typography variant="h6">Trust Servants Resources</Typography>
      <div>
        <List dense={true}>
          <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/19EQDeMd0vpdiZDd9Bai_OOOXsQTVTN6F?usp=sharing">
            <ListItem>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Area Minutes Archive" />
            </ListItem>
          </a>
          <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/1CbOPzwhE5LVG0-ZX1NlwvoEgwCoGkfmt">
            <ListItem>
              <ListItemIcon><FileCopyIcon /></ListItemIcon>
              <ListItemText primary="Literature Order Forms" />
            </ListItem>
          </a>
        </List>
      </div>
    </div >
  )
}

export default TrustedServants
