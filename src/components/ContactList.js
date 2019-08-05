import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import MarkunreadMailbox from '@material-ui/icons/MarkunreadMailbox';
import Email from '@material-ui/icons/Email';
import LocalPhone from '@material-ui/icons/LocalPhone';


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
          primary={<Typography variant='subtitle1' style={{ color: '#225c83' }}><a href="mailto:webservant.mhasc@gmail.com">webservant.mhasc@gmail.com</a></Typography>}
          secondary={<Typography variant='subtitle1' style={{ color: '#225c83' }}>Please email us comments, questions, or concerns.</Typography>}
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
