import React from 'react'
import { Grid } from '@material-ui/core'

const OuterContainer = ({ children }) => (
  <Grid container style={{ width: '90%', margin: '0 auto' }}> {children} </Grid>
)

export default OuterContainer