import React from 'react'
import { Typography, Grid } from '@material-ui/core'

const Home = (props) => {
  return (
    <Grid container>
      <Grid item md={2} />
      <Grid item md={8}>
        <Typography>
          Narcotics Anonymous is a nonprofit Fellowship or society of men and women for whom drugs had become a major problem. We are recovering addicts who meet regularly to help each other stay clean. This is a program of complete abstinence from all drugs. There is only one requirement for membership, the desire to stop using. We suggest that you keep an open mind and give yourself a break. Our program is a set of principles written so simply that we can follow them in our daily lives. The most important thing about them is that they work.
         <br /> Basic Text, chapter two What is the Narcotics Anonymous Program, page 9
 
      </Typography>

        <Typography>


        </Typography>
      </Grid>
      <Grid item md={2} />
    </Grid >
  )
}

export default Home