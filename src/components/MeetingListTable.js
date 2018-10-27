import React from 'react'
import {
  Table, Paper, TableHead,
  TableRow, TableBody, TableCell, Typography,
  Button,
} from '@material-ui/core'
import { capitalize } from 'lodash'

const meetingListTableStyles = {
  time: {},
  name: {},
  address: {},
  type: {}
}

const MeetingListTable = withStyles()(({ day, meetings }) => {
  return (
    <React.Fragment>
      <DayLabel day={day} />
      <Paper>
        <Table padding='dense'>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((m, ix) => <MeetingRow key={ix} {...m} />)}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  )
})

const MeetingRow = ({ time, name, format, address }) => {
  return (
    <TableRow>
      <TableCell>{time}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Button
          size='small'
          color='primary'
          target="_new"
          href={generateGoogleMapsLinkFromAddress(address)}
        >
          <Address {...address}
          />
        </Button>
      </TableCell>
      <TableCell><span>{format.join(', ')}</span></TableCell>
    </TableRow>
  )
}

const DayLabel = ({ day }) => {
  return (
    <Typography
      variant='h6'
      style={{ margin: '25px 4px 4px' }}>
      <a name={day} />
      {capitalize(day)}
    </Typography>
  )
}

const Address = ({ street, unit, city, zip, notes }) => {
  notes = notes && `(${notes})`
  street = unit ? street : `${street},`
  unit = unit && `${unit},`
  return (
    <span>{street} {unit} {city} {zip} {notes}</span>
  )
}

const generateGoogleMapsLinkFromAddress = ({ street, city, zip }) => {
  return `https://www.google.com/maps/place/${street.replace(/\W/g, '+')},+${city},+CO+${zip}`
}


export default MeetingListTable