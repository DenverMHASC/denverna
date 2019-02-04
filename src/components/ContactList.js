import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core'
import { LocalPhone, Email, MarkunreadMailbox } from '@material-ui/icons'

const ContactList = (_props) => {
  return (
    <List component="nav">
      <ListItem>
        <ListItemIcon>
          <LocalPhone />
        </ListItemIcon>
        <ListItemText
          primary={<Typography style={{ color: '#225c83' }}>
            <a href="tel:303-832-3784">(303) 832-3784</a>
          </Typography>}
          secondary={<Typography style={{ color: '#225c83' }}>Connection to a recovering addict 24/7, meetings, and events.</Typography>}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant='subtitle1' style={{ color: '#225c83' }}>webservant.mhasc@gmail.com</Typography>}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MarkunreadMailbox />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant='subtitle1' style={{ color: '#225c83' }}>
            <span>MHASC <br />   PO Box 140100 <br />Edgewater, CO 80214-0100 </span>
          </Typography>}
        />
      </ListItem>
    </List>
  )
}

export default ContactList
