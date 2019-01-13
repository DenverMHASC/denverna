import React from 'react'
import { Grid } from '@material-ui/core'

const OuterContainer = ({ children }) => (
  <Grid container style={{ width: '85%', margin: '0 auto' }}> {children} </Grid>
)

export default OuterContainer
