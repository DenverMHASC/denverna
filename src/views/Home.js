import React from 'react'
import { Typography, Grid, Button, } from '@material-ui/core'
import ContactList from '../components/ContactList'

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
        <ContactList />
      </Grid>
      <Grid item md={2} />
    </Grid >
  )
}


export default Home