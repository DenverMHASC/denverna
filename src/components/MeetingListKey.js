import React from 'react'
import { sortBy, map } from 'lodash'
import MeetingListKeyData from './MeetingListKeyData'

import {
  Table, TableHead, TableRow, TableCell, TableBody, withStyles
} from '@material-ui/core'

const style = {
  headerRow: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  row: {
    fontSize: '16px',
  }
}
const MeetingListKey = withStyles(style)(({ formats, classes }) => {
  const filteredFormats = MeetingListKeyData.filter(f => formats.includes(f.key))

  return (
    <Table style={{ width: '260px', marginTop: '16px' }}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.headerRow}>Key</TableCell>
          <TableCell className={classes.headerRow}>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(sortBy(filteredFormats, 'key'), (v) => (
          <TableRow key={v.id}>
            <TableCell className={classes.row}>{v.key}</TableCell>
            <TableCell className={classes.row}>{v.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

export default MeetingListKey
