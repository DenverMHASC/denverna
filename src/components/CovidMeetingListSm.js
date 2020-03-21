import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { map } from 'lodash'
import DayLabel from './DayLabel'
import Address from './Address'
import A from './A'
import moment from 'moment'

const MeetingListSm = ({ meetings }) => (
  map(meetings, (meetings, day) => <CardGroup key={day} day={day} meetings={meetings} />)
)

const CardGroup = ({ meetings, day }) => {
  return (
    <div>
      <DayLabel day={day} />
      {meetings.map((m, ix) => <MeetingCard key={ix} {...m} />)}
    </div>
  )
}

const MeetingCardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0'
  },
  typography: {
    fontSize: '16px'
  }
}



const MeetingCard = withStyles(MeetingCardStyles)(({ meetingtime, meetingname, classes, closed, type, phonenumber, code, link, directions }) => {
  return (
    <Paper className={classes.root}>
      <Typography className={classes.typography}>Name: {meetingname}</Typography>
      <Typography className={classes.typography}>Time: {moment(meetingtime, 'hh:mm:ss').format('h:mm A')}</Typography>
      <Typography className={classes.typography}>Facility Closed: {closed}</Typography>
      {type ? renderDetails(classes, type, phonenumber, code, link, directions) : null}
      {directions ? <Typography className={classes.typography}>Directions: {directions}</Typography> : null}
    </Paper>
  )
})


const renderDetails = (classes, type, phonenumber, code, link, directions) => {
  switch (type) {
    case 'Zoom':
      return (
        <React.Fragment>
          <Typography className={classes.typography}>Link: <a href={link}>{link}</a></Typography>
          {phonenumber ? <Typography className={classes.typography}>Phone Number: <a href={'tel:' + phonenumber + ',,' + code + '#'}>{phonenumber + ',,' + code + '#'}</a></Typography> : null}
        </React.Fragment>
      )
    case 'Phone':
      return <Typography className={classes.typography}>Phone Number: <a href={'tel:' + phonenumber + ',,' + code + '#'}>{phonenumber + ',,' + code + '#'}</a></Typography>
    case 'Park':
      return null
    default:
      return <Typography className={classes.typography}>Details: {phonenumber} {code} {link}</Typography>
  }
}

export default MeetingListSm
