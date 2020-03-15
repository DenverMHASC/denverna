import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'



const rowStyles = {
  cell: {
    fontSize: '16px'
  }
}

const AlertRow = withStyles(rowStyles)(({ timestamp, meetingname, details, link, classes }) => {
  return (
    <TableRow>
      <TableCell className={classes.cell}>{meetingname}</TableCell>
      <TableCell className={classes.cell}>
        {details}
        {link ? <span> <br /> <a href={link} target="_blank">Virtual Meeting Link</a> </span> : null}
      </TableCell>
      <TableCell className={classes.cell}>{moment(timestamp, 'M-D-YYYY HH:mm:ss').format('MM/DD/YYYY')}</TableCell>
    </TableRow>
  )
})

const alertsTableStyles = {
  timestamp: {
    fontSize: '16px',
    fontWeight: 'bold',
    width: '15%'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    width: '25%'
  },
  details: {
    fontSize: '16px',
    fontWeight: 'bold',
    width: '60%'
  },
}


const AlertsTable = withStyles(alertsTableStyles)(({ classes, alerts }) => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title={<Typography style={{ color: '#225c83' }} variant='h5'>Coronavirus Updates</Typography>}
          subheader={<Typography style={{ color: '#225c83' }}>
            <a
              href="https://www.na.org/admin/include/spaw2/uploads/pdf/Coronavirus_web_message_12Mar.pdf"
              target="_blank"
            >
              Please Review the NA World Services Coronavirus Statement
          </a>
          </Typography>}
        />

        <CardContent>
          <Table padding='dense'>
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell className={classes.title}>Meeting Name</TableCell>
                <TableCell className={classes.details}>Details</TableCell>
                <TableCell className={classes.timestamp}>Updated On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((a, ix) => <AlertRow key={ix} {...a} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </React.Fragment>
  )
})

export default AlertsTable