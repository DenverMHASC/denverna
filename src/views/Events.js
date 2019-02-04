import React from 'react'
import OuterContainer from '../components/OuterContainer'
import { CardContent, Card, CardHeader, Typography } from '@material-ui/core';


const Events = (props) => {
  const style = {
    width: '100%',
    height: '600px'
  }
  return (
    <OuterContainer>
      <Card style={{ width: '100%', marginTop: '20px' }}>
        <CardHeader
          title={<Typography style={{ color: '#225c83' }} variant='h5'>Activities and Events</Typography>}
          subheader={<Typography style={{ color: '#225c83' }}>Monthly Potlucks, Mile High Activities, and more!</Typography>}
        />
        <CardContent>
          <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=4k9ssjiot8q7sgehorhomf18m0%40group.calendar.google.com&amp;color=%2342104A&amp;ctz=America%2FDenver" style={style} frameBorder="0" scrolling="no"></iframe>
        </CardContent>
      </Card>
    </OuterContainer>
  )
}

export default Events
