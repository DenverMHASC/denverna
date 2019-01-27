import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { LocalPhone, Email, MarkunreadMailbox } from '@material-ui/icons'

const ContactList = (_props) => {
  return (
    <List component="nav">
      <ListItem>
        <ListItemIcon>
          <LocalPhone />
        </ListItemIcon>
        <ListItemText
          primary="(303) 832-3784"
          secondary="Connection to a recovering addict 24/7, meetings, and events."
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText primary="webservant.mhasc@gmail.com" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MarkunreadMailbox />
        </ListItemIcon>
        <ListItemText primary={<span>MHASC <br />   PO Box 140100 <br />Edgewater, CO 80214-0100 </span>} />
      </ListItem>
    </List>
  )
}

export default ContactList
