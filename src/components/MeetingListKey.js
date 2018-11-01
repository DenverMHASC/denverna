import React from 'react'
import { sortBy, map } from 'lodash'
import MeetingListKeyData from './MeetingListKeyData'

import {
  Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper
} from '@material-ui/core'


const MeetingListKey = ({ formats }) => {
  const filteredFormats = MeetingListKeyData.filter(f => formats.includes(f.key))

  return (
    <Table style={{ width: '260px' }}>
      <TableHead>
        <TableRow>
          <TableCell>Key</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(sortBy(filteredFormats, 'key'), (v) => (
          <TableRow key={v.id}>
            <TableCell>{v.key}</TableCell>
            <TableCell>{v.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MeetingListKey
