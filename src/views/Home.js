import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import withWidth from '@material-ui/core/withWidth'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import OuterContainer from '../components/OuterContainer'
import ContactList from '../components/ContactList'
import DonationModal from '../components/DonationModal'
import skyline from '../../assets/skyline.jpg'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const { history, classes, width } = this.props
    return (
      <OuterContainer width={width}>
        <Typography variant='h3' style={{ margin: '0 auto', textAlign: 'center' }} color='primary'>
          Welcome to the Mile High Area
      </Typography>
        <Typography style={{ margin: '0 auto', textAlign: 'center', width: '100%' }} color='primary' >
          The Mile High Area of Narcotics Anonymous serves Denver, the greater Denver Metro Area, Summit County, and Steamboat Springs.
      </Typography>
        <Button
          variant="outlined"
          onClick={this.handleOpen}
          style={{ marginTop: '15px', color: '#1c84be' }}
        >
          Make a Donation With Venmo
      </Button>
        <div
          style={{ marginTop: '20px', position: 'relative' }}
        >
          <CardMedia
            component="img"
            className={classes.skyline}
            image={skyline}
            title="R0uge [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], from Wikimedia Commons"
            height="400"
          />
          <div className={classes.viewMeetings}>

            <Typography align='center' variant='h5' style={{ margin: '0 auto', color: '#225c83' }} >
              Recovery happens in meetings, please join us.
          </Typography>
            <Button
              style={{ marginTop: '10px', backgroundColor: '#1c84be', color: 'white' }}
              variant='contained'
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
              <Typography variant='subtitle1' style={{ marginBottom: '1em', color: '#225c83' }}>
                Narcotics Anonymous is a nonprofit Fellowship or society of men and women for whom drugs had become a major problem. We are recovering addicts who meet regularly to help each other stay clean. This is a program of complete abstinence from all drugs. There is only one requirement for membership, the desire to stop using. We suggest that you keep an open mind and give yourself a break. Our program is a set of principles written so simply that we can follow them in our daily lives. The most important thing about them is that they work.
              <br /><br /> <i> - What is the Narcotics Anonymous Program, Basic Text (p. 9) </i>
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
        <DonationModal handleClose={this.handleClose} open={this.state.open} />
      </OuterContainer >
    )
  }
}

const styles = {
  skyline: {
    opacity: '0.4',
    objectFit: 'cover',
    marginBottom: '2em',
  },
  viewMeetings: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  lowerHeader: {
    marginBottom: '1em',
    color: '#225c83',
  }
}


export default withWidth()(withStyles(styles)(Home))
