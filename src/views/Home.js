import React from 'react'
import { Typography, Grid, Button, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { LocalPhone, Email, MarkunreadMailbox } from '@material-ui/icons'

const Home = (props) => {
  const { history } = props
  return (
    <Grid container>
      <Grid item md={2} />
      <Grid item md={8}>
        <Typography variant='subtitle1' style={{ marginBottom: '1em' }}>
          Narcotics Anonymous is a nonprofit Fellowship or society of men and women for whom drugs had become a major problem. We are recovering addicts who meet regularly to help each other stay clean. This is a program of complete abstinence from all drugs. There is only one requirement for membership, the desire to stop using. We suggest that you keep an open mind and give yourself a break. Our program is a set of principles written so simply that we can follow them in our daily lives. The most important thing about them is that they work.
         <br /> <i>Basic Text, chapter two What is the Narcotics Anonymous Program, page 9 </i>
        </Typography>
        <Typography style={{ marginBottom: '1em' }} variant='subtitle1'>
          Recovery happens in meetings, please join us. <br />
          <Button color='primary' onClick={() => history.push('/meetings')}>View Meeting List</Button>
        </Typography>
        <Typography>
          Speak to a recovering addict
        </Typography>
        <List component="nav">
          <ListItem>
            <ListItemIcon>
              <LocalPhone />
            </ListItemIcon>
            <ListItemText primary="(303)-832-3784" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="PhoneLine.mhasc@gmail.com" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MarkunreadMailbox />
            </ListItemIcon>
            <ListItemText primary={<span>MHASC <br />   PO Box 140100 <br />Edgewater, CO 80214-0100 </span>} />
          </ListItem>
        </List>



      </Grid>
      <Grid item md={2} />
    </Grid >
  )
}


export default Home