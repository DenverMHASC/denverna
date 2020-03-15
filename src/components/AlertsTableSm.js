import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'


const AlertsTableSm = ({ alerts }) => (
  alerts.map((alert) => <MeetingCard key={alert.meetingname} {...alert} />)
)

const MeetingCardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0'
  },
  typography: {
    fontSize: '16px'
  }
}



const MeetingCard = withStyles(MeetingCardStyles)(({ timestamp, meetingname, details, link, classes }) => {
  return (
    <Paper className={classes.root}>
      <Typography className={classes.typography}>Meeting Name: {meetingname}</Typography>
      <Typography className={classes.typography}>
        Details: {details} {link ? <span> <br /> <a href={link} target="_blank">Virtual Meeting Link</a> </span> : null}
      </Typography>
      <Typography className={classes.typography}>Updated On: {moment(timestamp, 'M-D-YYYY HH:mm:ss').format('MM/DD/YYYY')}</Typography>

    </Paper>
  )
})

export default AlertsTableSm
