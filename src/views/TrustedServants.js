import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  withStyles,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/LinkSharp';
import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'


const DOCUMENT_ID = "1BLFmqqeuhRJpSagt2NWks8kTYfJ-sMCjYJtzyC8krh0"

const styles = theme => ({
});


class TrustedServants extends React.Component {
  constructor() {
    super()
    this.state = {
      links: []
    }
  }

  componentDidMount() {
    GetSheetDone.labeledCols(DOCUMENT_ID).then(sheet => {
      this.setState({ links: sheet.data })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <OuterContainer>
        <Grid item md={4} sm={12} >
          <Card>
            <CardHeader
              title="Mile High Area Service Meetings"
            />
            <CardContent>
              <iframe
                src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=9ip36bqq8qgdusokmkb96n486k%40group.calendar.google.com&amp;color=%2329527A&amp;ctz=America%2FDenver"
                style={{ border: '0', margin: '0 auto', width: '100%', height: '400px' }} frameBorder="0" scrolling="no"></iframe>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} sm={12} >
          <Card>
            <CardHeader
              title="Trusted Servant Resources"
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={false}>
                  <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/19EQDeMd0vpdiZDd9Bai_OOOXsQTVTN6F?usp=sharing">
                    <ListItem>
                      <ListItemIcon><FolderIcon /></ListItemIcon>
                      <ListItemText primary="Area Minutes Archive" />
                    </ListItem>
                  </a>
                  <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/1CbOPzwhE5LVG0-ZX1NlwvoEgwCoGkfmt">
                    <ListItem>
                      <ListItemIcon><FileCopyIcon /></ListItemIcon>
                      <ListItemText primary="Literature Order Forms" />
                    </ListItem>
                  </a>
                </List>
                <List dense={true}>
                  {this.state.links.map(({ linktext, linkurl }, ix) => {
                    return (
                      <a key={ix} target="_new" style={{ textDecoration: 'none' }} href={linkurl}>
                        <ListItem>
                          <ListItemIcon><LinkIcon /></ListItemIcon>
                          <ListItemText primary={linktext} />
                        </ListItem>
                      </a>
                    )
                  })}
                </List>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </OuterContainer>
    )
  }
}

export default withStyles(styles)(TrustedServants)
