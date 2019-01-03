import React from 'react'
import { Typography, Grid, Button, withStyles } from '@material-ui/core'
import OuterContainer from '../components/OuterContainer'
import ContactList from '../components/ContactList'

const Home = (props) => {
  const { history, classes } = props
  return (
    <OuterContainer>
      <Typography variant='h3' style={{ margin: '0 auto' }} color='primary'>
        Welcome to the Mile High Area
         </Typography>
      <div
        style={{ marginTop: '20px', position: 'relative' }}
      >
        <img
          className={classes.skyline}
          src='/assets/skyline.jpg'
        />
        <div className={classes.viewMeetings}>
          <Typography align='center' variant='h5' style={{ margin: '0 auto' }} color='primary'>
            Recovery happens in meetings, please join us.
         </Typography>
          <Button
            style={{ marginTop: '10px' }}
            variant='contained'
            color='primary'
            onClick={() => history.push('/meetings')}
          >
            View Meeting List
            </Button>
        </div>

      </div>
      <Grid container>
        <Grid item md={8} sm={12} >
          <div style={{ width: '80%' }}>
            <Typography className={classes.lowerHeader} variant='h5'>What is Narcotics Anonymous?</Typography>
            <Typography variant='subtitle1' style={{ marginBottom: '1em' }}>
              Narcotics Anonymous is a nonprofit Fellowship or society of men and women for whom drugs had become a major problem. We are recovering addicts who meet regularly to help each other stay clean. This is a program of complete abstinence from all drugs. There is only one requirement for membership, the desire to stop using. We suggest that you keep an open mind and give yourself a break. Our program is a set of principles written so simply that we can follow them in our daily lives. The most important thing about them is that they work.
         <br /> <i>Basic Text, chapter two What is the Narcotics Anonymous Program, page 9 </i>
            </Typography>
          </div>
        </Grid>
        <Grid item md={4} sm={12}>
          <Typography className={classes.lowerHeader} variant='h5'>
            Speak to a recovering addict
        </Typography>
          <ContactList />
        </Grid>
      </Grid>
    </OuterContainer >
  )
}

const styles = {
  skyline: {
    opacity: '0.4',
    height: 'auto',
    maxWidth: '100%',
    marginBottom: '2em'
  },
  viewMeetings: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  lowerHeader: {
    marginBottom: '1em'
  }
}


export default withStyles(styles)(Home)